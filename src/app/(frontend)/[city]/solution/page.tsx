import { getHomePageData } from '@/app/utils/homeService'
import BGraphic from '../../_components/BGRaphic'
import ServicesBlock from '../../_components/ServicesBlock'
import { ALLOWED_CITIES } from '@/app/utils/cities'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { resolveLocale } from '@/app/utils/locale'

type Props = {
  params: Promise<{ city: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { city } = await params

  if (!ALLOWED_CITIES.includes(city)) {
    notFound()
  }
  return {
    title: { absolute: 'Услуги компании Simply Digital' },
    description:
      'Услуги компании Simply Digital: комплексный digital-маркетинг, стратегия, реклама, SEO, SMM и аналитика.',
    alternates: {
      canonical: `https://simplydigital.kz/${city}/solution/`,
    },
    openGraph: {
      title: 'Услуги компании Simply Digital',
      description:
        'Услуги компании Simply Digital: комплексный digital-маркетинг, стратегия, реклама, SEO, SMM и аналитика.',
      url: `https://simplydigital.kz/${city}/solution/`,
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
      title: 'Услуги компании Simply Digital',
      description:
        'Услуги компании Simply Digital: комплексный digital-маркетинг, стратегия, реклама, SEO, SMM и аналитика.',
      images: ['https://simplydigital.kz/company-og.jpg'],
    },
  }
}

export default async function page({ params }: Props) {
  const { city } = await params
  if (!ALLOWED_CITIES.includes(city)) {
    notFound()
  }
  const cookieStore = await cookies()
  const locale = resolveLocale(cookieStore.get('lang')?.value)

  const { component, solutions } = await getHomePageData(locale)
  const serviceBlock = component.globals.find((block) => block.blockType === 'services')
  const heading = serviceBlock?.heading || ''

  return (
    <div>
      <BGraphic />
      <ServicesBlock heading={heading} solutions={solutions} />
    </div>
  )
}
