import { Solution, Subservice } from '@/payload-types'

export type ServiceItem = {
  name: string
  icon?: {
    url: string
    alt?: string
  } | null
}

export type AvailableServicesProps = {
  solution: Solution
  subservices: Subservice[]
  subservice?: Subservice
}
