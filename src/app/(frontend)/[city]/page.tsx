import { notFound } from 'next/navigation'
import React from 'react'
import { ALLOWED_CITIES } from '@/app/utils/cities'
import { getHomePageData } from '@/app/utils/homeService'
import HeroBlock from '../_components/HeroBlock'
import AboutUsBlock from '../_components/AboutUsBlock'
import TrustedByBlock from '../_components/TrustedByBlock'
import LeadCaptureBlock from '../_components/LeadCaptureBlock'
import TeamBlock from '../_components/TeamBlock'
import CertificateBlock from '../_components/CertificateBlock'
import ReviewsBlock from '../_components/ReviewsBlock'
import BrandsBlock from '../_components/BrandsBlock'
import ServicesBlock from '../_components/ServicesBlock'
import CasesBlock from '../_components/CasesBlock'
import BGraphic from '../_components/BGRaphic'
import RequestFormBlock from '../_components/RequestFormBlock'
import FloatingNav from '../_components/FloatingNav'
import PostsSection from '../_components/PostsSection'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { resolveLocale } from '@/app/utils/locale'

interface PageProps {
  params: Promise<{ city: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { city } = await params

  if (!ALLOWED_CITIES.includes(city)) {
    notFound()
  }

  return {
    openGraph: {
      title: 'Simply Digital — Маркетинговое агентство полного цикла',
      description:
        'Simply Digital — это маркетинговое агентство, которое помогает бизнесу расти через комплексные digital-решения: стратегия, реклама, контент и аналитика.',
      url: `https://simplydigital.kz/${city}`,
      images: [
        {
          url: 'https://simplydigital.kz/company-og.jpg',
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Simply Digital — Маркетинговое агентство полного цикла',
      description:
        'Simply Digital — это маркетинговое агентство, которое помогает бизнесу расти через комплексные digital-решения: стратегия, реклама, контент и аналитика.',
      images: ['https://simplydigital.kz/company-og.jpg'],
    },
  }
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params
  if (!ALLOWED_CITIES.includes(city)) {
    notFound()
  }

  const cookieStore = await cookies()
  const locale = resolveLocale(cookieStore.get('lang')?.value)

  const { component, solutions, cases, navigation } = await getHomePageData(locale)

  const serviceBlock = component.globals.find((block) => block.blockType === 'services')
  const heading = serviceBlock?.heading || ''

  const formBlocks = component.globals.filter((block) => block.blockType === 'form')
  const requestForm = component.globals.find((block) => block.blockType === 'request-form')

  const postBlock = component.globals.find((block) => block.blockType === 'posts')
  const postHeading = postBlock?.heading || 'Последнее из блога'

  return (
    <div>
      <BGraphic />
      <FloatingNav nav={navigation} />
      <HeroBlock component={component} />
      <div className="block md:hidden">
        <BrandsBlock component={component} isLabel={false} />
      </div>
      <AboutUsBlock component={component} />
      <ServicesBlock heading={heading} solutions={solutions} />
      <TrustedByBlock component={component} />
      <CasesBlock heading="Кейсы – истории, которые мы создали" cases={cases} type="slider" />
      <LeadCaptureBlock block={formBlocks[0]} formId="form-0" />
      <CertificateBlock component={component} />
      <div className="hidden md:block">
        <BrandsBlock component={component} isLabel={true} />
        <LeadCaptureBlock block={formBlocks[1]} formId="form-1" />
      </div>
      <TeamBlock component={component} />
      <ReviewsBlock component={component} />
      <PostsSection heading={postHeading} />
      {requestForm && <RequestFormBlock block={requestForm} />}
    </div>
  )
}
