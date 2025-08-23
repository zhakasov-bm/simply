import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getAllSubservices() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  const res = await payload.find({ collection: 'subservices', limit: 100, user })
  return res.docs
}
