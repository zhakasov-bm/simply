import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getAllSubservices() {
  const payload = await getPayload({ config })
  const res = await payload.find({ collection: 'subservices', limit: 100 })
  return res.docs
}
