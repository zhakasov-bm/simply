import { getPayload } from 'payload'
import { headers as getHeaders, cookies } from 'next/headers.js'
import { resolveLocale } from '@/app/utils/locale'

import config from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import BGraphic from '../../_components/BGRaphic'
import Breadcrumbs from '../../_components/Breadcrumbs/Breadcrumbs'
import VacancyCard from './components/VacancyCard'
import { Vacancy } from '@/payload-types'
import { ALLOWED_CITIES } from '@/app/utils/cities'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ city: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { city } = await params

  if (!ALLOWED_CITIES.includes(city)) {
    notFound()
  }

  return {
    title: 'Вакансии',
    description:
      'Актуальные вакансии в Simply Digital. Присоединяйтесь к нашей команде и развивайтесь вместе с нами.',
    alternates: {
      canonical: `https://simplydigital.kz/${city}/vacancy`,
    },
    openGraph: {
      title: 'Вакансии компании Simply Digital',
      description:
        'Актуальные вакансии в Simply Digital. Присоединяйтесь к нашей команде и развивайтесь вместе с нами.',
      url: `https://simplydigital.kz/${city}/vacancy`,
      images: [
        {
          url: 'https://simplydigital.kz/company-og.jpg',
          width: 1200,
          height: 630,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Вакансии компании Simply Digital',
      description:
        'Актуальные вакансии в Simply Digital. Присоединяйтесь к нашей команде и развивайтесь вместе с нами.',
      images: ['https://simplydigital.kz/company-og.jpg'],
    },
  }
}
//
export default async function page({ params }: Props) {
  const payload = await getPayload({ config })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })
  const locale = resolveLocale((await cookies()).get('lang')?.value)

  const { city } = await params
  if (!ALLOWED_CITIES.includes(city)) {
    notFound()
  }

  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'vacancy' } },
    limit: 1,
    user,
    locale,
  })

  const page = res.docs[0]

  const vacancyRes = await payload.find({
    collection: 'vacancy',
    sort: '-createdAt',
    limit: 100,
    user,
    locale,
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

      <div className="mb-8 px-6 md:px-0 pt-8 md:pt-20 flex justify-center">
        <Breadcrumbs customLabels={{ vacancy: page?.name || 'Вакансии' }} />
      </div>

      <div className="px-8 md:px-40">
        {page?.heading ? <RichText data={page.heading} className="vacancy-richtext" /> : null}

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
