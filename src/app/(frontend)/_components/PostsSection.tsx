import Link from 'next/link'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { RichText as SerializedRichText } from '@payloadcms/richtext-lexical/react'
import { formatDate } from '@/app/utils/date'

type Props = {
  heading: any
}

export default async function PostsSection({ heading }: Props) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const posts = await payload.find({
    collection: 'posts',
    limit: 2,
    sort: '-createdAt',
    where: {
      includedInBlog: {
        equals: true,
      },
    },
  })

  return (
    <div className="container-class" id="blog">
      <div className="flex gap-12 sm:gap-24 md:flex-row flex-col">
        <div className="w-72">
          <SerializedRichText data={heading} />
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-12">
          {posts.docs.map((post) => (
            <Link href={`/blogs/${post.slug}`} key={post.id} className="group block">
              <article className="space-y-4">
                <h3 className="texl-lg md:text-xl font-normal text-label line-clamp-3 group-hover:text-hoverText transition-colors mb-3">
                  {post.title}
                </h3>
              </article>
              <div>
                <time className="text-link/40 font-inter text-sm font-light">
                  {formatDate(post.createdAt)}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
