import ReviewBlock from '../../../../_components/ReviewsBlock'
import CertificateBlock from '../../../../_components/CertificateBlock'
import BrandsBlock from '../../../../_components/BrandsBlock'
import InfoBlock from './InfoBlock'
import ProblemBlock from '../../components/ProblemBlock'
import LeadCaptureBlock from '../../../../_components/LeadCaptureBlock'
import Hero from './Hero'
import WhyUsBlock from './WhyUsBlock'
import BGraphic from '../../../../_components/BGRaphic'
import TrustedByBlock from '../../../../_components/TrustedByBlock'
import QABlock from './QABlock'
import AvailableServices from './AvailableServices/AvailableServices'
import CasesBlock from '../../../../_components/CasesBlock'
import WhyServiceNeeded from './WhyServiceNeeded'
import LeadBlock from '../../components/LeadBlock'

interface SolutionPageLayoutProps {
  component: any
  solution: any
  subservices: any[]
  cases: any[]
  formBlock: any
  requestFormBlock: any
}

export function SolutionPageLayout({
  component,
  solution,
  subservices,
  cases,
  formBlock,
  requestFormBlock,
}: SolutionPageLayoutProps) {
  return (
    <div>
      <BGraphic />
      <Hero component={component} solution={solution} />
      <BrandsBlock component={component} />

      <div className="hidden md:block">{formBlock && <LeadCaptureBlock block={formBlock} />}</div>

      {solution.hasSubservices && <WhyServiceNeeded solution={solution} />}
      {!solution.hasSubservices && <InfoBlock solution={solution} />}

      <ProblemBlock solution={solution} />
      <AvailableServices subservices={subservices} solution={solution} />
      <CasesBlock heading="Наши кейсы" cases={cases} type="slider" />

      {formBlock && <LeadCaptureBlock block={formBlock} />}
      <WhyUsBlock component={component} />
      <CertificateBlock component={component} />
      <TrustedByBlock component={component} />
      <ReviewBlock component={component} />

      <QABlock solution={solution} />
      <LeadBlock solution={solution} />
    </div>
  )
}
