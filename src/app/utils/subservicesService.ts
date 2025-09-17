import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'

import config from '@/payload.config'
import { extractFormBlocks } from '@/app/utils/formBlockUtils'
import { Component, Solution, Subservice, Case, Navigation } from '@/payload-types'
import { AppLocale } from './locale'
import { getHomePageData } from './homeService'
import { notFound } from 'next/navigation'

type FormBlockType = Extract<Component['globals'][0], { blockType: 'form' }>
type RequestFormBlockType = Extract<Component['globals'][0], { blockType: 'request-form' }>

export interface SubserviceData {
  component: Component
  service: Solution
  subservice: Subservice
  cases: Case[]
  formBlock: FormBlockType | null
  requestFormBlock: RequestFormBlockType | null
  seoBlocks: NonNullable<Subservice['additionalBlocks']>
  navigation: Navigation
}

export async function getSubserviceData(
  serviceSlug: string,
  subSlug: string,
  locale: AppLocale | 'all',
): Promise<SubserviceData> {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  const { navigation } = await getHomePageData(locale)

  const payloadLocale = locale === 'all' ? 'all' : locale

  const [component, serviceRes, casesResult] = await Promise.all([
    payload.findGlobal({ slug: 'component', locale: payloadLocale, user }),
    payload.find({
      collection: 'solutions',
      where: { slug: { equals: serviceSlug } },
      user,
      locale: payloadLocale,
    }),
    payload.find({
      collection: 'cases',
      limit: 3,
      sort: '-createdAt',
      user,
      locale: payloadLocale,
    }),
  ])

  const service = serviceRes.docs[0]
  if (!service) {
    notFound()
  }

  const subRes = await payload.find({
    collection: 'subservices',
    where: { slug: { equals: subSlug }, service: { equals: service.id } },
    user,
    locale: payloadLocale,
  })

  const subservice = subRes.docs[0]
  if (!subservice) {
    notFound()
  }

  // Extract form blocks using shared utility
  const { formBlock, requestFormBlock } = extractFormBlocks(component.globals || [])

  // Extract SEO blocks
  const seoBlocks =
    subservice.additionalBlocks?.filter((b: any) => b.blockType === 'seoblock') || []

  return {
    component,
    service,
    subservice,
    cases: casesResult.docs,
    formBlock,
    requestFormBlock,
    seoBlocks,
    navigation,
  }
}
