import config from '@/payload.config'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'

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
import FloatingNav from '@/app/(frontend)/_components/FloatingNav'

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
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  const [component, navigation, subReq] = await Promise.all([
    payload.findGlobal({ slug: 'component' }),
    payload.findGlobal({ slug: 'navigation' }),
    payload.find({
      collection: 'subservices',
      where: { slug: { equals: 'popolnenie' } },
      user,
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
    <div>
      <BGraphic />
      <FloatingNav nav={navigation} />
      <Hero component={component} subservice={sub} />
      <BrandsBlockBlock component={component} />
      {advBlock && <AdvantagesBlock block={advBlock} />}
      {tarifBlock && <TarifBlock block={tarifBlock} />}
      {formBlock && <LeadCaptureBlock block={formBlock} formId="form-0" />}
      {/* {tarifBlock && <Calculator block={tarifBlock} />} */}

      <TrustedByBlock component={component} />

      <ReviewBlock component={component} />
      <QABlock subservice={sub} />
      {requestFormBlock && <RequestFormBlock block={requestFormBlock} />}
    </div>
  )
}
