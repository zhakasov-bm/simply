import { getPayload } from 'payload'
import config from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import BGraphic from '../../_components/BGRaphic'
import Breadcrumbs from '../../_components/Breadcrumbs/Breadcrumbs'
import VacancyCard from './components/VacancyCard'
import { Vacancy } from '@/payload-types'

export default async function page() {
  const payload = await getPayload({ config })

  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'vacancy' } },
    limit: 1,
  })

  const page = res.docs[0]

  const vacancyRes = await payload.find({
    collection: 'vacancy',
    sort: '-createdAt',
    limit: 100,
  })

  const vacancies: Vacancy[] = vacancyRes.docs

  const groupedByCategory = vacancies.reduce<Record<string, Vacancy[]>>((acc, vacancy) => {
    const category = vacancy.category || 'Другие'
    if (!acc[category]) acc[category] = []
    acc[category].push(vacancy)
    return acc
  }, {})

  const categoryTitles: Record<string, string> = {
    IT: 'IT-вакансии',
    marketing: 'Маркетинг',
    Другие: 'Другие',
  }

  return (
    <div>
      <BGraphic />

      <div className="mb-8 px-6 md:px-0 pt-28 md:pt-20 flex justify-center">
        <Breadcrumbs customLabels={{ vacancy: page?.name || 'Вакансии' }} />
      </div>

      <div className="px-8 md:px-40">
        <RichText data={page?.heading} className="vacancy-richtext" />

        {Object.entries(groupedByCategory).map(([category, vacancies]) => (
          <div key={category} className="py-8 md:py-12">
            <h2 className="text-xl mb-6">{categoryTitles[category] || category}</h2>
            <div className="flex flex-col gap-3">
              {vacancies.map((vacancy, i) => (
                <VacancyCard key={vacancy.id || i} item={vacancy} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
