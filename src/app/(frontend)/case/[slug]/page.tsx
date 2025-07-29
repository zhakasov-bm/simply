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
import RequestFormBlock from '../../_components/RequestFormBlock'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Получаем кейс по слагу
async function getCase(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise })

    const component = await payload.findGlobal({ slug: 'component' })

    const caseResult = await payload.find({
      collection: 'cases',
      where: { slug: { equals: slug } },
    })

    if (!caseResult.docs?.length) return notFound()

    const caseData = caseResult.docs[0]
    const formBlock = component?.globals?.find((block) => block.blockType === 'form')
    const requestForm = component.globals.find((block) => block.blockType === 'request-form')

    const casesResult = await payload.find({
      collection: 'cases',
      limit: 10,
    })

    return {
      caseData,
      component,
      formBlock,
      requestForm,
      casesList: casesResult.docs,
    }
  } catch (error) {
    console.error('Ошибка при получении кейса:', error)
    return notFound()
  }
}

// Метаданные страницы
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params
  const { caseData } = await getCase(slug)

  return {
    title: `${caseData.heading}`,
    // description: post.subheading.substring(0, 160),
  }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  if (!slug) return notFound()
  const { caseData, component, formBlock, requestForm, casesList } = await getCase(slug)

  return (
    <div>
      <BGraphic />
      <Hero caseData={caseData} />
      <BrandsBlock component={component} />
      <OrderBLock caseData={caseData} />
      <ActionsBlock caseData={caseData} />
      <ResultsBlock caseData={caseData} />
      {formBlock && <LeadCaptureBlock block={formBlock} formId="case-detail-form" />}
      <CasesBlock
        heading="Посмотрите другие кейсы"
        cases={casesList}
        type="simple"
        excludeId={caseData.id}
      />
      {requestForm && <RequestFormBlock block={requestForm} />}
    </div>
  )
}
