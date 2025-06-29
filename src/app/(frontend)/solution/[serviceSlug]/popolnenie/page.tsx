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
import Calculator from './components/Calculator'

interface PageProps {
  params: Promise<{ serviceSlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PopolneniePage({ params }: PageProps) {
  const { serviceSlug } = await params
  const targetSlug = 'performance-marketing'

  if (serviceSlug !== targetSlug) {
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
      {/* {tarifBlock && <Calculator block={tarifBlock} />} */}

      <TrustedByBlock component={component} />

      <ReviewBlock component={component} />
      <QABlock subservice={sub} />
      {requestFormBlock && <RequestFormBlock block={requestFormBlock} />}
    </div>
  )
}
