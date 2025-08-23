import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'

import config from '@/payload.config'
import Hero from './_components/Hero'
import TeamBlock from '../_components/TeamBlock'
import CertificateBlock from '../_components/CertificateBlock'
import BGraphic from '../_components/BGRaphic'
import About from './_components/About'
import Mission from './_components/Mission'
import RequestFormBlock from '../_components/RequestFormBlock'
import LeadCaptureBlock from '../_components/LeadCaptureBlock'
import FloatingNav from '../_components/FloatingNav'

export const metadata = {
  title: { absolute: 'О компании Simply Digital' },
  description:
    'О компании Simply Digital: наши ценности, команда и подход к решению маркетинговых задач.',
  alternates: {
    canonical: `https://simplydigital.kz/company`,
  },
  openGraph: {
    title: 'О компании Simply Digital',
    description:
      'О компании Simply Digital: наши ценности, команда и подход к решению маркетинговых задач.',
    url: 'https://simplydigital.kz/company',
    images: [
      {
        url: 'https://simplydigital.kz/company-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'О компании Simply Digital',
    description:
      'О компании Simply Digital: наши ценности, команда и подход к решению маркетинговых задач.',
    images: ['https://simplydigital.kz/company-og.jpg'],
  },
}

export default async function CompanyPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'company' } },
    limit: 1,
    user,
  })
  const page = res.docs[0]

  const component = await payload.findGlobal({ slug: 'component' })
  const formBlocks = component.globals.filter((block) => block.blockType === 'form')
  const requestForm = component.globals.find((block) => block.blockType === 'request-form')
  const navigation = await payload.findGlobal({ slug: 'navigation' })

  if (!page) {
    return <div>Страница не найдена</div>
  }

  return (
    <div>
      <BGraphic />
      <FloatingNav nav={navigation} />

      <Hero page={page} />
      <About page={page} />
      <Mission page={page} />
      <LeadCaptureBlock block={formBlocks[0]} formId="company-form" />
      <TeamBlock component={component} />
      <CertificateBlock component={component} />
      {requestForm && <RequestFormBlock block={requestForm} />}
    </div>
  )
}
