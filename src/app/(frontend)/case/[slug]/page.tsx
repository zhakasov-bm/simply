import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import BrandsBlock from '../../_components/BrandsBlock'
import Hero from './components/Hero'
import OrderBLock from './components/OrderBlock'
import ActionsBlock from './components/ActionsBlock'
import ResultsBlock from './components/ResultsBlock'
import LeadCaptureBlock from '../../_components/LeadCaptureBlock'
import CasesBlock from '../../_components/CasesBlock'
import BGraphic from '../../_components/BGRaphic'

export async function generateStaticParams() {
  // optionally: to support static generation
  return []
}

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params
  if (!slug) return notFound()

  const payload = await getPayload({ config: configPromise })

  const component = await payload.findGlobal({ slug: 'component' })

  const caseResult = await payload.find({
    collection: 'cases',
    where: { slug: { equals: slug } },
  })

  if (!caseResult.docs?.length) return notFound()
  const caseData = caseResult.docs[0]

  const formBlock = component?.globals?.find((block) => block.blockType === 'form')

  const casesResult = await payload.find({ collection: 'cases', limit: 10 })

  return (
    <div>
      <BGraphic />
      <Hero caseData={caseData} />
      <BrandsBlock component={component} />
      <OrderBLock caseData={caseData} />
      <ActionsBlock caseData={caseData} />
      <ResultsBlock caseData={caseData} />
      {formBlock && <LeadCaptureBlock block={formBlock} />}
      <CasesBlock
        heading="Посмотрите другие кейсы"
        cases={casesResult.docs}
        type="simple"
        excludeId={caseData.id}
      />
    </div>
  )
}
