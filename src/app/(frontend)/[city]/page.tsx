import { notFound } from 'next/navigation'
import React from 'react'
import { ALLOWED_CITIES } from '@/app/utils/cities'
import { getHomePageData } from '@/app/utils/homeService'
import '../styles.css'
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

interface PageProps {
  params: Promise<{ city: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ params }: PageProps) {
  const { city } = await params
  if (!ALLOWED_CITIES.includes(city)) return notFound()

  const { component, solutions, cases, navigation } = await getHomePageData()

  const serviceBlock = component.globals.find((block) => block.blockType === 'services')
  const heading = serviceBlock?.heading || ''

  const formBlocks = component.globals.filter((block) => block.blockType === 'form')
  const requestForm = component.globals.find((block) => block.blockType === 'request-form')

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
      <LeadCaptureBlock block={formBlocks[0]} />
      <CertificateBlock component={component} />
      <div className="hidden md:block">
        <BrandsBlock component={component} isLabel={true} />
        <LeadCaptureBlock block={formBlocks[1]} />
      </div>
      <TeamBlock component={component} />
      <ReviewsBlock component={component} />
      {requestForm && <RequestFormBlock block={requestForm} />}
    </div>
  )
}
