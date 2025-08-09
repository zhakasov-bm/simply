import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import config from '@/payload.config'
import { getPayload } from 'payload'
import PostBlock from './components/PostBlock'
import { getHomePageData } from '@/app/utils/homeService'
import { getPost } from '@/app/utils/getPostData'
import FloatingNav from '../../_components/FloatingNav'
import PostsSection from '../../_components/PostsSection'
import RequestFormBlock from '../../_components/RequestFormBlock'

type Props = {
  params: Promise<{ postSlug: string }>
}

// Метаданные страницы
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { postSlug: slug } = await params

  const post = await getPost(slug)

  const imageUrl = typeof post.image === 'string' ? post.image : post.image?.url || ''

  if (!post) {
    notFound()
  }

  return {
    title: `${post.title}`,
    description: post.description.substring(0, 160) || '',
    alternates: {
      canonical: `https://simplydigital.kz/blogs/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description ?? '',
      url: `https://simplydigital.kz/blogs/${slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description ?? '',
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function Page({ params }: Props) {
  const { postSlug: slug } = await params

  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const { component, navigation } = await getHomePageData()
  const requestForm = component.globals.find((block) => block.blockType === 'request-form')

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const posts = await payload.find({
    collection: 'posts',
    limit: 8,
    sort: '-createdAt',
    where: {
      includedInBlog: {
        equals: true,
      },
    },
  })

  return (
    <div>
      <FloatingNav nav={navigation} />

      <PostBlock posts={posts.docs} post={post} />

      {requestForm && <RequestFormBlock block={requestForm} />}
    </div>
  )
}
