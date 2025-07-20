import { Vacancy } from '@/payload-types'

export const categoryTitles: Record<string, string> = {
  IT: 'IT-вакансии',
  marketing: 'Маркетинг',
  Другие: 'Другие',
}

export function groupVacanciesByCategory(vacancies: Vacancy[]) {
  return vacancies.reduce<Record<string, Vacancy[]>>((acc, vacancy) => {
    const category = vacancy.category || 'Другие'
    if (!acc[category]) acc[category] = []
    acc[category].push(vacancy)
    return acc
  }, {})
}
