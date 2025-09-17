import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { AppLocale } from './locale'

export async function getAllSubservices(locale: AppLocale | 'all') {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  const payloadLocale = locale === 'all' ? 'all' : locale

  const res = await payload.find({
    collection: 'subservices',
    limit: 100,
    user,
    locale: payloadLocale,
  })
  return res.docs
}
