import config from '@/payload.config'
import { getPayload } from 'payload'
import { Post } from '@/payload-types'

export async function getPost(slug: string): Promise<Post> {
  try {
    const payload = await getPayload({ config })
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
    })

    return result.docs?.[0]
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}
