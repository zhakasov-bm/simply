import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'
import config from '@/payload.config'
import { Component, Solution, Case, Navigation } from '@/payload-types'

export interface HomePageData {
  component: Component
  solutions: Solution[]
  cases: Case[]
  navigation: Navigation
}

export async function getHomePageData(): Promise<HomePageData> {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  const [component, solutionsRes, casesRes, navigation] = await Promise.all([
    payload.findGlobal({ slug: 'component', user }),
    payload.find({ collection: 'solutions', limit: 20, user }),
    payload.find({ collection: 'cases', limit: 10, user }),
    payload.findGlobal({ slug: 'navigation', user }),
  ])

  return {
    component,
    solutions: solutionsRes.docs,
    cases: casesRes.docs,
    navigation,
  }
}
