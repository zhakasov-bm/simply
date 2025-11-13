import { NextRequest, NextResponse } from 'next/server'

type LeadFields = Record<string, string>
type UploadedFile = Blob & { name?: string }

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { fields, file } = await parseIncomingPayload(request)
    const formName = fields.form || 'website-form'
    delete fields.form

    const sanitizedFields = sanitizeFields(fields)
    const name = getFieldValue(sanitizedFields, ['name', 'fullname', 'full_name', 'fio', 'имя', 'фио'])
    const phone = getFieldValue(sanitizedFields, ['phone', 'tel', 'телефон'])
    const email = getFieldValue(sanitizedFields, ['email', 'почта'])

    if (!name) {
      return NextResponse.json({ ok: false, error: 'Поле "Имя" обязательно' }, { status: 400 })
    }

    if (!phone && !email) {
      return NextResponse.json(
        { ok: false, error: 'Укажите телефон или email, чтобы мы могли связаться с вами' },
        { status: 400 },
      )
    }

    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'Максимальный размер файла не должен превышать 5 МБ' },
        { status: 400 },
      )
    }

    const env = getServerEnv()

    await sendToTelegram({
      botToken: env.telegramBotToken,
      chatId: env.telegramChatId,
      formName,
      fields: sanitizedFields,
      file,
    })

    await sendToBitrix({
      webhookBase: env.bitrixWebhookUrl,
      formName,
      fields: sanitizedFields,
      name,
      phone,
      email,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Lead submission failed:', error)
    const message = error instanceof Error ? error.message : 'Не удалось обработать заявку'
    const status = /обязательно|укажите|размер/i.test(message) ? 400 : 500
    return NextResponse.json({ ok: false, error: message }, { status })
  }
}

async function parseIncomingPayload(
  request: NextRequest,
): Promise<{ fields: LeadFields; file: UploadedFile | null }> {
  const contentType = request.headers.get('content-type') || ''
  const fields: LeadFields = {}
  let file: UploadedFile | null = null

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    formData.forEach((value, key) => {
      if (value instanceof Blob) {
        if (!file && value.size > 0) {
          file = value as UploadedFile
        }
        return
      }

      fields[key] = typeof value === 'string' ? value : String(value)
    })
  } else if (contentType.includes('application/json')) {
    const json = await request.json()
    if (json && typeof json === 'object') {
      Object.entries(json as Record<string, unknown>).forEach(([key, value]) => {
        if (typeof value === 'string') {
          fields[key] = value
        } else if (value != null) {
          fields[key] = String(value)
        }
      })
    }
  } else {
    throw new Error('Неподдерживаемый тип контента')
  }

  return { fields, file }
}

function sanitizeFields(fields: LeadFields): LeadFields {
  return Object.entries(fields).reduce<LeadFields>((acc, [key, value]) => {
    const trimmedKey = key.trim()
    const trimmedValue = value.trim()

    if (trimmedKey && trimmedValue) {
      acc[trimmedKey] = trimmedValue
    }

    return acc
  }, {})
}

function getFieldValue(fields: LeadFields, aliases: string[]) {
  const normalizedAliases = aliases.map((alias) => alias.toLowerCase())

  for (const [key, value] of Object.entries(fields)) {
    const normalizedKey = key.toLowerCase()
    if (normalizedAliases.some((alias) => normalizedKey === alias || normalizedKey.includes(alias))) {
      return value
    }
  }

  return ''
}

type ServerEnv = {
  telegramBotToken: string
  telegramChatId: string
  bitrixWebhookUrl: string
}

function getServerEnv(): ServerEnv {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
  const telegramChatId = process.env.TELEGRAM_CHAT_ID
  const bitrixWebhookUrl = process.env.BITRIX_WEBHOOK_URL

  const missing: string[] = []
  if (!telegramBotToken) missing.push('TELEGRAM_BOT_TOKEN')
  if (!telegramChatId) missing.push('TELEGRAM_CHAT_ID')
  if (!bitrixWebhookUrl) missing.push('BITRIX_WEBHOOK_URL')

  if (missing.length) {
    throw new Error(`Проверьте серверные переменные окружения: ${missing.join(', ')}`)
  }

  return {
    telegramBotToken: telegramBotToken!,
    telegramChatId: telegramChatId!,
    bitrixWebhookUrl: bitrixWebhookUrl!,
  }
}

async function sendToTelegram({
  botToken,
  chatId,
  formName,
  fields,
  file,
}: {
  botToken: string
  chatId: string
  formName: string
  fields: LeadFields
  file: UploadedFile | null
}) {
  const message = buildTelegramMessage(formName, fields)

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }),
  })

  const result = await response.json()
  if (!response.ok || !result?.ok) {
    throw new Error(result?.description || 'Telegram: не удалось отправить сообщение')
  }

  if (file) {
    const formData = new FormData()
    formData.append('chat_id', chatId)
    formData.append('caption', `Форма: ${formName}`)
    formData.append('document', file, file.name || 'attachment')

    const fileResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
      method: 'POST',
      body: formData,
    })

    const fileResult = await fileResponse.json()
    if (!fileResponse.ok || !fileResult?.ok) {
      throw new Error(fileResult?.description || 'Telegram: не удалось отправить файл')
    }
  }
}

async function sendToBitrix({
  webhookBase,
  formName,
  fields,
  name,
  phone,
  email,
}: {
  webhookBase: string
  formName: string
  fields: LeadFields
  name: string
  phone: string
  email: string
}) {
  const normalizedBase = webhookBase.replace(/\/+$/, '')
  const hasJsonSuffix = /\.json$/i.test(normalizedBase)
  const base = hasJsonSuffix ? normalizedBase.replace(/\/[^/]+\.json$/i, '') : normalizedBase
  const url = `${base}/crm.lead.add.json`

  const commentLines = [
    `Форма: ${formName}`,
    ...Object.entries(fields).map(([key, value]) => `${key}: ${value}`),
  ]

  const payload = {
    fields: {
      TITLE: `Заявка (${formName})`,
      NAME: name,
      PHONE: phone
        ? [
            {
              VALUE: phone,
              VALUE_TYPE: 'WORK',
            },
          ]
        : [],
      EMAIL: email
        ? [
            {
              VALUE: email,
              VALUE_TYPE: 'WORK',
            },
          ]
        : [],
      COMMENTS: commentLines.join('\n'),
      SOURCE_ID: 'WEB',
    },
    params: { REGISTER_SONET_EVENT: 'Y' },
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const result = await response.json()
  if (!response.ok || result?.error) {
    throw new Error(result?.error_description || result?.error || 'Bitrix: не удалось создать лид')
  }
}

function buildTelegramMessage(formName: string, fields: LeadFields) {
  const lines = [`<b>Новая заявка (${escapeHtml(formName)})</b>`]

  Object.entries(fields).forEach(([key, value]) => {
    lines.push(`<b>${escapeHtml(key)}:</b> ${escapeHtml(value)}`)
  })

  return lines.join('\n')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
