export function formatDate(timestamp: string | number | Date): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
