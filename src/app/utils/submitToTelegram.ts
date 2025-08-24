const MAX_FILE_SIZE = 5 * 1024 * 1024

export async function submitToTelegram(data: Record<string, string>, file?: File) {
  if (file && file.size > MAX_FILE_SIZE) {
    throw new Error('Максимальный размер файла не должен превышать 5 МБ')
  }

  const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!
  const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!

  const message = Object.entries(data)
    .map(([key, value]) => `<b>${key}:</b> ${value}`)
    .join('\n')

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    }),
  })

  const textResult = await response.json()
  if (!textResult.ok) {
    throw new Error(textResult.description || 'Не удалось отправить сообщение')
  }

  if (file) {
    const formData = new FormData()
    formData.append('chat_id', TELEGRAM_CHAT_ID)
    formData.append('document', file, file.name)

    const fileRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: formData,
    })

    const fileResult = await fileRes.json()
    if (!fileResult.ok) {
      throw new Error(fileResult.description || 'Не удалось отправить файл')
    }
  }

  return { ok: true }
}
