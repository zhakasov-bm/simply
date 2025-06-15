import config from '@/payload.config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import BGraphic from '@/app/(frontend)/_components/BGRaphic'
import Hero from '../_components/Hero'
import LeadCaptureBlock from '@/app/(frontend)/_components/LeadCaptureBlock'
import BrandsBlockBlock from '@/app/(frontend)/_components/BrandsBlock'
import InfoBlock from '../_components/InfoBlock'
import AvailableServices from '../_components/AvailableServices/AvailableServices'
import WhyUsBlock from '../_components/WhyUsBlock'
import CasesBlock from '@/app/(frontend)/_components/CasesBlock'
import TrustedByBlock from '@/app/(frontend)/_components/TrustedByBlock'
import ReviewBlock from '@/app/(frontend)/_components/ReviewsBlock'
import RequestFormBlock from '@/app/(frontend)/_components/RequestFormBlock'
import QABlock from '../_components/QABlock'
import SeoBlock from './components/SeoBlock'

export default async function SubservicePage({
  params,
}: {
  params: { serviceSlug: string; subSlug: string }
}) {
  const { serviceSlug, subSlug } = params

  const payload = await getPayload({ config })

  const [component, serviceRes] = await Promise.all([
    payload.findGlobal({ slug: 'component' }),
    payload.find({
      collection: 'solutions',
      where: { slug: { equals: serviceSlug } },
    }),
  ])

  const service = serviceRes.docs[0]
  if (!service) return notFound()

  const subRes = await payload.find({
    collection: 'subservices',
    where: { slug: { equals: subSlug }, service: { equals: service.id } },
  })
  const sub = subRes.docs[0]
  if (!sub) return notFound()

  let formBlock = null
  let requestFormBlock = null

  for (const block of component.globals || []) {
    if (block.blockType === 'form' && !formBlock) formBlock = block
    if (block.blockType === 'request-form' && !requestFormBlock) requestFormBlock = block
    if (formBlock && requestFormBlock) break
  }

  const casesResult = await payload.find({
    collection: 'cases',
    limit: 3,
    sort: '-createdAt', // minus = descending
  })

  const seoBlocks = sub.additionalBlocks?.filter((b) => b.blockType === 'seoblock') || []

  return (
    <div>
      <BGraphic />
      <Hero component={component} subservice={sub} />
      <BrandsBlockBlock component={component} />

      {formBlock && <LeadCaptureBlock block={formBlock} />}
      <InfoBlock subservice={sub} />
      {sub.slug === 'seo' && seoBlocks[0] && <SeoBlock block={seoBlocks[0]} />}
      <AvailableServices solution={service} subservices={[sub]} subservice={sub} />
      <WhyUsBlock component={component} />
      <CasesBlock heading="Наши кейсы" cases={casesResult.docs} type="simple" />
      {formBlock && <LeadCaptureBlock block={formBlock} />}
      {sub.slug === 'seo' && seoBlocks[1] && <SeoBlock block={seoBlocks[0]} />}
      <TrustedByBlock component={component} />

      <ReviewBlock component={component} />
      {requestFormBlock && <RequestFormBlock block={requestFormBlock} />}
      <QABlock subservice={sub} />
    </div>
  )
}
