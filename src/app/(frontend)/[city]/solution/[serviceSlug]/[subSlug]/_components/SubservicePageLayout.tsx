import BGraphic from '@/app/(frontend)/_components/BGRaphic'
import Hero from '../../_components/Hero'
import LeadCaptureBlock from '@/app/(frontend)/_components/LeadCaptureBlock'
import BrandsBlockBlock from '@/app/(frontend)/_components/BrandsBlock'
import InfoBlock from '../../_components/InfoBlock'
import AvailableServices from '../../_components/AvailableServices/AvailableServices'
import WhyUsBlock from '../../_components/WhyUsBlock'
import CasesBlock from '@/app/(frontend)/_components/CasesBlock'
import TrustedByBlock from '@/app/(frontend)/_components/TrustedByBlock'
import ReviewBlock from '@/app/(frontend)/_components/ReviewsBlock'
import RequestFormBlock from '@/app/(frontend)/_components/RequestFormBlock'
import QABlock from '../../_components/QABlock'
import SeoBlock from './SeoBlock'
import FloatingNav from '@/app/(frontend)/_components/FloatingNav'

interface SubservicePageLayoutProps {
  component: any
  service: any
  subservice: any
  cases: any[]
  formBlock: any
  requestFormBlock: any
  seoBlocks: any[]
  navigation: any
}

export function SubservicePageLayout({
  component,
  service,
  subservice,
  cases,
  formBlock,
  requestFormBlock,
  seoBlocks,
  navigation,
}: SubservicePageLayoutProps) {
  return (
    <div>
      <BGraphic />
      <FloatingNav nav={navigation} />

      <Hero component={component} subservice={subservice} />
      <BrandsBlockBlock component={component} />

      {formBlock && <LeadCaptureBlock block={formBlock} formId="form-0" />}
      <InfoBlock subservice={subservice} />

      {subservice.slug === 'SEO' && seoBlocks[0] && <SeoBlock block={seoBlocks[0]} />}

      <AvailableServices solution={service} subservices={[subservice]} subservice={subservice} />
      <WhyUsBlock component={component} />
      <CasesBlock heading="Наши кейсы" cases={cases} type="simple" />

      {formBlock && <LeadCaptureBlock block={formBlock} formId="form-1" />}
      {subservice.slug === 'SEO' && seoBlocks[1] && <SeoBlock block={seoBlocks[1]} />}

      <TrustedByBlock component={component} />
      <ReviewBlock component={component} />
      <QABlock subservice={subservice} />

      {requestFormBlock && <RequestFormBlock block={requestFormBlock} />}
    </div>
  )
}
