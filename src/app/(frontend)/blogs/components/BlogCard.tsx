import { Post } from '@/payload-types'
import Image from 'next/image'
import { RichText as SerializedRichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { formatDate } from '@/app/utils/date'

type Props = {
  post: Post
}

export default function BlogCard({ post }: Props) {
  return (
    <div className="h-full">
      <Link
        href={`/blogs/${post.slug}`}
        key={post.id}
        className="group flex flex-col justify-between h-full gap-3 bg-none md:bg-background p-0 md:p-3 rounded-custom"
      >
        {post.image && typeof post.image === 'object' && post.image.url && (
          <div className="relative w-full h-[180px] sm:h-[200px] rounded-2xl overflow-hidden mt-2 md:m-0">
            <Image
              src={post.image.url}
              alt={post.image.alt || ''}
              fill
              className="object-cover"
              draggable={false}
            />
          </div>
        )}

        <div className="flex flex-col gap-2 p-2 flex-grow">
          <time className="text-link/40 font-inter text-xs font-normal">
            {formatDate(post.createdAt)}
          </time>
          <article className="space-y-4 font-inter">
            <h4 className="text-xl md:text-lg font-medium leading-6 text-link group-hover:text-hoverText transition-colors mb-3">
              {post.title}
            </h4>
            {post.content && (
              <SerializedRichText
                className="text-sm line-clamp-2 md:line-clamp-5 text-link/60"
                data={post.content}
              />
            )}
          </article>
        </div>

        <p className="hidden md:block font-inter text-center text-sm text-blue-500 underline mb-2">
          Читать полностью
        </p>
      </Link>

      <div className="md:hidden border-t border-link/10 py-2"></div>
    </div>
  )
}
