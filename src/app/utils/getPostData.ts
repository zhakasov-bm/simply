import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import { Post } from '@/payload-types'
import { AppLocale } from './locale'

export async function getPost(slug: string, locale: AppLocale | 'all'): Promise<Post> {
  try {
    const headers = await getHeaders()
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers })

    const payloadLocale = locale === 'all' ? 'all' : locale

    const result = await payload.find({
      collection: 'posts',
      sort: '-createdAt',

      where: {
        slug: {
          equals: slug,
        },
        includedInBlog: {
          equals: true,
        },
      },
      user,
      locale: payloadLocale,
    })

    return result.docs?.[0]
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}
