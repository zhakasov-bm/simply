import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

import ReviewBlock from '../../_components/ReviewsBlock'
import CertificateBlock from '../../_components/CertificateBlock'
import BrandsBlock from '../../_components/BrandsBlock'
import InfoBlock from './_components/InfoBlock'
import ProblemBlock from '../components/ProblemBlock'
import LeadCaptureBlock from '../../_components/LeadCaptureBlock'
import Hero from './_components/Hero'
import WhyUsBlock from './_components/WhyUsBlock'
import BGraphic from '../../_components/BGRaphic'
import TrustedByBlock from '../../_components/TrustedByBlock'
import RequestFormBlock from '../../_components/RequestFormBlock'
import QABlock from './_components/QABlock'
import AvailableServices from './_components/AvailableServices/AvailableServices'
import CasesBlock from '../../_components/CasesBlock'
import WhyServiceNeeded from './_components/WhyServiceNeeded'
import LeadBlock from '../components/LeadBlock'

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const res = await payload.find({ collection: 'solutions' })

  return res.docs.map((solution) => ({
    serviceSlug: solution.slug,
  }))
}

export default async function SolutionPage({ params }: { params: { serviceSlug: string } }) {
  const slug = params.serviceSlug
  if (!slug) return notFound()

  const payload = await getPayload({ config: configPromise })

  const [component, solutionRes] = await Promise.all([
    payload.findGlobal({ slug: 'component' }),
    payload.find({
      collection: 'solutions',
      where: { slug: { equals: slug } },
    }),
  ])

  const solution = solutionRes.docs?.[0]
  if (!solution) return notFound()

  const casesResult = await payload.find({
    collection: 'cases',
    limit: 3,
    sort: '-createdAt', // minus = descending
  })

  // Get subservices related to this service
  const subservicesRes = await payload.find({
    collection: 'subservices',
    where: {
      service: {
        equals: solution.id,
      },
    },
  })

  const subservices = subservicesRes.docs.map((sub) => ({
    ...sub,
    icon:
      typeof sub.icon === 'object' && sub.icon
        ? {
            ...sub.icon,
            url: sub.icon.url || '',
            alt: sub.icon.alt || '',
          }
        : sub.icon,
  }))

  let formBlock = null
  let requestFormBlock = null

  for (const block of component.globals || []) {
    if (block.blockType === 'form' && !formBlock) formBlock = block
    if (block.blockType === 'request-form' && !requestFormBlock) requestFormBlock = block
    if (formBlock && requestFormBlock) break
  }

  return (
    <div>
      <BGraphic />
      <Hero component={component} solution={solution} />
      <BrandsBlock component={component} />

      {formBlock && <LeadCaptureBlock block={formBlock} />}
      {solution.hasSubservices && <WhyServiceNeeded solution={solution} />}
      {!solution.hasSubservices && <InfoBlock solution={solution} />}
      <ProblemBlock solution={solution} />
      <AvailableServices subservices={subservices} solution={solution} />
      <CasesBlock heading="Наши кейсы" cases={casesResult.docs} type="simple" />
      {formBlock && <LeadCaptureBlock block={formBlock} />}

      <WhyUsBlock component={component} />
      <CertificateBlock component={component} />
      <TrustedByBlock component={component} />
      <ReviewBlock component={component} />

      {requestFormBlock && <RequestFormBlock block={requestFormBlock} />}
      <QABlock solution={solution} />
      <LeadBlock solution={solution} />
    </div>
  )
}
