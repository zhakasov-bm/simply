import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { extractFormBlocks } from '@/app/utils/formBlockUtils'
import { Component, Solution, Subservice, Case, Navigation } from '@/payload-types'
import { AppLocale } from './locale'
import { getHomePageData } from './homeService'
import { notFound } from 'next/navigation'

type FormBlockType = Extract<Component['globals'][0], { blockType: 'form' }>
type RequestFormBlockType = Extract<Component['globals'][0], { blockType: 'request-form' }>

export interface SolutionData {
  component: Component
  solution: Solution
  subservices: Subservice[]
  cases: Case[]
  formBlock: FormBlockType | null
  requestFormBlock: RequestFormBlockType | null
  navigation: Navigation
}

export async function getSolutionData(
  slug: string,
  locale: AppLocale | 'all',
): Promise<SolutionData> {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  const { navigation } = await getHomePageData(locale)

  const payloadLocale = locale === 'all' ? 'all' : locale

  const [component, solutionRes, casesResult] = await Promise.all([
    payload.findGlobal({ slug: 'component', user, locale: payloadLocale }),
    payload.find({
      collection: 'solutions',
      where: { slug: { equals: slug } },
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

  const solution = solutionRes.docs?.[0]
  if (!solution) {
    notFound()
  }

  // Get subservices related to this service
  const subservicesRes = await payload.find({
    collection: 'subservices',
    where: {
      service: {
        equals: solution.id,
      },
    },
    user,
    locale: payloadLocale,
  })

  const subservices = subservicesRes.docs.map((sub) => ({
    ...sub,
    icon:
      typeof sub.icon === 'object' && sub.icon
        ? {
            ...sub.icon,
            url: sub.icon.url || '',
            alt: sub.icon.alt || '',
          }
        : sub.icon,
  }))

  // Extract form blocks using shared utility
  const { formBlock, requestFormBlock } = extractFormBlocks(component.globals || [])

  return {
    component,
    solution,
    subservices,
    cases: casesResult.docs,
    formBlock,
    requestFormBlock,
    navigation,
  }
}
