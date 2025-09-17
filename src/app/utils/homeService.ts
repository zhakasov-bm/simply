import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'
import config from '@/payload.config'
import { Component, Solution, Case, Navigation } from '@/payload-types'
import { AppLocale } from './locale'

export interface HomePageData {
  component: Component
  solutions: Solution[]
  cases: Case[]
  navigation: Navigation
}

export async function getHomePageData(locale: AppLocale | 'all'): Promise<HomePageData> {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  const payloadLocale = locale === 'all' ? 'all' : locale

  const [component, solutionsRes, casesRes, navigation] = await Promise.all([
    payload.findGlobal({ slug: 'component', user, locale: payloadLocale }),
    payload.find({ collection: 'solutions', limit: 20, user, locale: payloadLocale }),
    payload.find({ collection: 'cases', limit: 10, user, locale: payloadLocale }),
    payload.findGlobal({ slug: 'navigation', user, locale: payloadLocale }),
  ])

  return {
    component,
    solutions: solutionsRes.docs,
    cases: casesRes.docs,
    navigation,
  }
}
