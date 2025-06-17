import config from '@/payload.config'
import { getPayload } from 'payload'
import { notFound, redirect } from 'next/navigation'
import BGraphic from '@/app/(frontend)/_components/BGRaphic'
import Hero from '../_components/Hero'
import LeadCaptureBlock from '@/app/(frontend)/_components/LeadCaptureBlock'
import BrandsBlockBlock from '@/app/(frontend)/_components/BrandsBlock'
import TrustedByBlock from '@/app/(frontend)/_components/TrustedByBlock'
import ReviewBlock from '@/app/(frontend)/_components/ReviewsBlock'
import RequestFormBlock from '@/app/(frontend)/_components/RequestFormBlock'
import QABlock from '../_components/QABlock'
import AdvantagesBlock from './components/AdvantagesBlock'
import TarifBlock from './components/TarifBlock'

export default async function PopolneniePage({ params }: { params: { serviceSlug: string } }) {
  const targetSlug = 'performance-marketing'

  if (params.serviceSlug !== targetSlug) {
    redirect(`/solution/${targetSlug}/popolnenie`)
  }

  const payload = await getPayload({ config })

  // Fetch the subservice "popolnenie"
  // const  = await payload.find({
  //   collection: 'subservices',
  //   where: {
  //     slug: { equals: 'popolnenie' },
  //   },
  // })

  const [component, subReq] = await Promise.all([
    payload.findGlobal({ slug: 'component' }),
    payload.find({
      collection: 'subservices',
      where: { slug: { equals: 'popolnenie' } },
    }),
  ])

  const sub = subReq.docs?.[0]

  if (!sub) return notFound()

  const advBlock = sub.additionalBlocks?.find((block) => block.blockType === 'advantagesblock')
  const tarifBlock = sub.additionalBlocks?.find((block) => block.blockType === 'tarifblock')

  let formBlock = null
  let requestFormBlock = null

  for (const block of component.globals || []) {
    if (block.blockType === 'form' && !formBlock) formBlock = block
    if (block.blockType === 'request-form' && !requestFormBlock) requestFormBlock = block
    if (formBlock && requestFormBlock) break
  }

  return (
    <div className="p-6">
      <BGraphic />
      <Hero component={component} subservice={sub} />
      <BrandsBlockBlock component={component} />
      {advBlock && <AdvantagesBlock block={advBlock} />}
      {tarifBlock && <TarifBlock block={tarifBlock} />}
      {formBlock && <LeadCaptureBlock block={formBlock} />}

      <TrustedByBlock component={component} />

      <ReviewBlock component={component} />
      {requestFormBlock && <RequestFormBlock block={requestFormBlock} />}
      <QABlock subservice={sub} />
    </div>
  )
}
