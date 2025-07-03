import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { extractFormBlocks } from '@/app/utils/formBlockUtils'
import { Component, Solution, Subservice, Case } from '@/payload-types'

type FormBlockType = Extract<Component['globals'][0], { blockType: 'form' }>
type RequestFormBlockType = Extract<Component['globals'][0], { blockType: 'request-form' }>

export interface SolutionData {
  component: Component
  solution: Solution
  subservices: Subservice[]
  cases: Case[]
  formBlock: FormBlockType | null
  requestFormBlock: RequestFormBlockType | null
}

export async function getSolutionData(slug: string): Promise<SolutionData> {
  const payload = await getPayload({ config: configPromise })

  const [component, solutionRes, casesResult] = await Promise.all([
    payload.findGlobal({ slug: 'component' }),
    payload.find({
      collection: 'solutions',
      where: { slug: { equals: slug } },
    }),
    payload.find({
      collection: 'cases',
      limit: 3,
      sort: '-createdAt',
    }),
  ])

  const solution = solutionRes.docs?.[0]
  if (!solution) {
    throw new Error('Solution not found')
  }

  // Get subservices related to this service
  const subservicesRes = await payload.find({
    collection: 'subservices',
    where: {
      service: {
        equals: solution.id,
      },
    },
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
  }
}
