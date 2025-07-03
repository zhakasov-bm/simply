import { getPayload } from 'payload'
import config from '@/payload.config'
import { Component, Solution, Case, Navigation } from '@/payload-types'

export interface HomePageData {
  component: Component
  solutions: Solution[]
  cases: Case[]
  navigation: Navigation
}

export async function getHomePageData(): Promise<HomePageData> {
  const payload = await getPayload({ config })
  const component = await payload.findGlobal({ slug: 'component' })
  const solutionsRes = await payload.find({ collection: 'solutions', limit: 20 })
  const casesRes = await payload.find({ collection: 'cases', limit: 10 })
  const navigation = await payload.findGlobal({ slug: 'navigation' })
  return {
    component,
    solutions: solutionsRes.docs,
    cases: casesRes.docs,
    navigation,
  }
}
