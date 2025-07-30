// lib/submitToTelegram.ts

export async function submitToTelegram(data: Record<string, string>) {
  const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!
  const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!

  const message = Object.entries(data)
    .map(([key, value]) => `<b>${key}:</b> ${value}`)
    .join('\n')

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    }),
  })

  const result = await response.json()

  if (!result.ok) {
    throw new Error(result.description || 'Не удалось отправить сообщение')
  }

  return result
}
