import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'

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
import FloatingNav from '../../_components/FloatingNav'
import VideoBlock from './components/VideoBlock'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Получаем кейс по слагу
async function getCase(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise })

    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    const component = await payload.findGlobal({ slug: 'component', user })

    const caseResult = await payload.find({
      collection: 'cases',
      where: { slug: { equals: slug } },
      user,
    })

    if (!caseResult.docs?.length) return notFound()

    const caseData = caseResult.docs[0]
    const formBlock = component?.globals?.find((block) => block.blockType === 'form')
    const requestForm = component.globals.find((block) => block.blockType === 'request-form')
    const navigation = await payload.findGlobal({ slug: 'navigation', user })

    const casesResult = await payload.find({
      collection: 'cases',
      limit: 10,
      user,
    })

    return {
      caseData,
      component,
      formBlock,
      requestForm,
      navigation,
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

  const imageUrl = typeof caseData.image === 'string' ? caseData.image : caseData.image?.url || ''

  return {
    title: `${caseData.heading}`,
    description: caseData.subtitle.substring(0, 160) ?? '',
    alternates: {
      canonical: `https://simplydigital.kz/case/${slug}`,
    },
    openGraph: {
      title: caseData.heading,
      description: caseData.subtitle ?? '',
      url: `https://simplydigital.kz/case/${slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: caseData.heading,
      description: caseData.subtitle ?? '',
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  if (!slug) return notFound()
  const { caseData, component, formBlock, requestForm, navigation, casesList } = await getCase(slug)

  return (
    <div>
      <BGraphic />
      <FloatingNav nav={navigation} />

      <Hero caseData={caseData} />
      <BrandsBlock component={component} />
      <OrderBLock caseData={caseData} />
      <ActionsBlock caseData={caseData} />
      <ResultsBlock caseData={caseData} />
      {formBlock && <LeadCaptureBlock block={formBlock} formId="case-detail-form" />}
      <VideoBlock caseData={caseData} />
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
