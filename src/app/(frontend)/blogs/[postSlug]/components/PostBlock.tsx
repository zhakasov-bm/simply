import { Post } from '@/payload-types'
import Image from 'next/image'
import { RichText as SerializedRichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { formatDate } from '@/app/utils/date'
import Breadcrumbs from '@/app/(frontend)/_components/Breadcrumbs/Breadcrumbs'

type Props = {
  posts: Post[]
  post: Post
}

export default function PostBlock({ posts, post }: Props) {
  return (
    <section className="container mx-auto my-10 px-6 lg:px-24">
      <Breadcrumbs customLabels={{ blogs: 'Блог', [post.slug]: post.title }} />
      <div className="flex flex-col md:flex-row gap-8 pt-10">
        <div className="flex flex-col gap-8 md:gap-16 md:w-[75%] w-full">
          {post.image && typeof post.image === 'object' && post.image.url && (
            <div className="w-full">
              <Image
                src={post.image.url}
                alt={post.image.alt || ''}
                width={1920}
                height={200}
                layout="responsive"
                className="object-cover rounded-2xl"
                draggable={false}
              />
            </div>
          )}

          <div>
            <h4 className="font-inter font-semibold text-xl mb-4">{post.title}</h4>
            {post.content && (
              <SerializedRichText className="payload-richtext" data={post.content} />
            )}
          </div>
        </div>

        <div className="flex md:h-screen sticky flex-col gap-8 md:w-[35%]">
          <h3 className="text-xl">Последнее в блоге</h3>
          <div className="flex flex-col gap-4">
            {posts
              .filter((item) => item.id !== post.id)
              .map((post) => (
                <Link href={`/blogs/${post.slug}`} key={post.id} className="group flex gap-3">
                  <div className="w-[100px] h-[60px] overflow-hidden rounded-lg relative shrink-0">
                    {post.image && typeof post.image === 'object' && post.image.url && (
                      <Image
                        src={post.image.url}
                        alt={post.image.alt || ''}
                        fill
                        className="object-cover"
                        draggable={false}
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <time className="text-link/40 font-inter text-xs font-normal">
                      {formatDate(post.createdAt)}
                    </time>
                    <article className="space-y-4 font-inter">
                      <h4 className="text-sm font-normal text-link line-clamp-3 group-hover:text-hoverText transition-colors mb-3">
                        {post.title}
                      </h4>
                    </article>
                  </div>
                </Link>
              ))}
          </div>
          <Link
            href={'/blogs'}
            className="font-inter text-sm text-blue-500 underline cursor-pointer"
          >
            Смотреть все блоги
          </Link>
        </div>
      </div>
    </section>
  )
}
