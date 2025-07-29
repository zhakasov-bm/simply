import { getPayload } from 'payload'
import { Case } from '@/payload-types'
import config from '@/payload.config'
import { CaseCard } from './_components/CaseCard'
import { RichText } from '@payloadcms/richtext-lexical/react'
import BGraphic from '../_components/BGRaphic'
import Breadcrumbs from '../_components/Breadcrumbs/Breadcrumbs'
import RequestFormBlock from '../_components/RequestFormBlock'
import { getHomePageData } from '@/app/utils/homeService'
import LeadCaptureBlock from '../_components/LeadCaptureBlock'

export const metadata = {
  title: { absolute: 'Кейсы Simply Digital — наши успешные проекты' },
  description:
    'Успешные кейсы компании Simply Digital. Реальные результаты и примеры роста бизнеса с помощью digital-решений.',
}

export default async function page() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'case' } },
    limit: 1,
  })
  const page = res.docs[0]
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

  const filteredCases = cases.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  const { component } = await getHomePageData()

  const formBlocks = component.globals.filter((block) => block.blockType === 'form')
  const requestForm = component.globals.find((block) => block.blockType === 'request-form')

  return (
    <div>
      <BGraphic />
      <div className="mb-8 px-6 md:px-0 pt-28 md:pt-20 flex justify-center">
        <Breadcrumbs />
      </div>
      <div className="px-8 md:px-64">
        <RichText data={page?.heading} />
      </div>
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-3 gap-3 px-4 py-8 md:py-16">
        {filteredCases.map((item) => (
          <CaseCard key={item.id} item={item} />
        ))}
      </div>
      <div className="block lg:hidden">
        <LeadCaptureBlock block={formBlocks[1]} formId="case-list-form" />
      </div>

      {requestForm && <RequestFormBlock block={requestForm} />}
    </div>
  )
}
