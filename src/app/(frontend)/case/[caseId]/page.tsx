import { Case } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import BrandsBlock from '../../_components/BrandsBlock'
import Hero from '../../case/[caseId]/components/Hero'
import OrderBLock from './components/OrderBlock'
import ActionsBlock from './components/ActionsBlock'
import ResultsBlock from './components/ResultsBlock'
import LeadCaptureBlock from '../../_components/LeadCaptureBlock'
import CasesBlock from '../../_components/CasesBlock'
import BGraphic from '../../_components/BGRaphic'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'

export default async function CasePage({ params }: { params: { caseId: string } }) {
  const { caseId } = await params

  const payload = await getPayload({ config: configPromise })
  const component = await payload.findGlobal({ slug: 'component' })
  const formBlocks = component.globals.filter((block) => block.blockType === 'form')
  const navigation = await payload.findGlobal({ slug: 'navigation' })

  let caseData: Case | null = null

  try {
    const res = await payload.findByID({
      collection: 'cases',
      id: caseId,
    })

    caseData = res
  } catch (err) {
    console.error(err)
    return notFound()
  }

  if (!caseData) {
    return notFound()
  }

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
      <Footer nav={navigation} />
    </div>
  )
}
