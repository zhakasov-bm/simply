import { Case, Solution } from '@/payload-types'
import configPromise from '@payload-config'
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
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'

type Props = {
  params: {
    slug: string[]
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function CasePage({ params }: Props) {
  const caseId = params.slug[0]

  const payload = await getPayload({ config: configPromise })
  const component = await payload.findGlobal({ slug: 'component' })
  const formBlocks = component.globals.filter((block) => block.blockType === 'form')
  const navigation = await payload.findGlobal({ slug: 'navigation' })

  const result = await payload.find({
    collection: 'cases',
    where: {
      slug: {
        equals: caseId,
      },
    },
  })

  const caseData = result.docs[0]

  if (!caseData) return notFound()

  let cases: Case[] = []

  try {
    let casesRes = await payload.find({
      collection: 'cases',
      limit: 10,
    })
    cases = casesRes.docs
  } catch (e) {
    console.log(e)
  }

  let solutions: Solution[] = []

  try {
    const solutionsRes = await payload.find({
      collection: 'solutions',
      limit: 10,
    })
    solutions = solutionsRes.docs
  } catch (e) {
    console.log(e)
  }

  return (
    <div>
      <BGraphic />
      <Header nav={navigation} />
      <Hero caseData={caseData} />
      <BrandsBlock component={component} />
      <OrderBLock caseData={caseData} />
      <ActionsBlock caseData={caseData} />
      <ResultsBlock caseData={caseData} />
      <LeadCaptureBlock block={formBlocks[0]} />
      <CasesBlock
        heading="Посмотрите другие кейсы"
        cases={cases}
        type="simple"
        excludeId={caseData.id}
      />
      <Footer nav={navigation} solutions={solutions} />
    </div>
  )
}
