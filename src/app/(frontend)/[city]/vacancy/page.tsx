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

  return (
    <div>
      <BGraphic />
      <div className="mb-8 px-6 md:px-0 pt-28 md:pt-20 flex justify-center">
        <Breadcrumbs />
      </div>
      <div className="px-8 md:px-56">
        <RichText data={page?.heading} className="case-richtext" />
        <div className="flex flex-col gap-2 py-8 md:py-16">
          {vacancies.map((vacancy, i) => (
            <VacancyCard key={i} item={vacancy} />
          ))}
        </div>
      </div>
    </div>
  )
}
