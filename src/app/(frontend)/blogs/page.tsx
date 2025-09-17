import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'

import config from '@/payload.config'
import BGraphic from '../_components/BGRaphic'
import Breadcrumbs from '../_components/Breadcrumbs/Breadcrumbs'
import { getHomePageData } from '@/app/utils/homeService'
import BlogCard from './components/BlogCard'
import FloatingNav from '../_components/FloatingNav'
import RequestFormBlock from '../_components/RequestFormBlock'
import { cookies } from 'next/headers'
import { resolveLocale } from '@/app/utils/locale'

export const metadata = {
  title: { absolute: 'Блог компании Simply Digital' },
  description:
    'Откройте Digital-блог Казахстана — полезные статьи, советы, обзоры. Нужна консультация? Звоните: +7 (775) 202 60 10.',
  alternates: {
    canonical: 'https://simplydigital.kz/blogs',
  },
  openGraph: {
    title: 'Блог компании Simply Digital',
    description:
      'Откройте Digital-блог Казахстана — полезные статьи, советы, обзоры. Нужна консультация? Звоните: +7 (775) 202 60 10.',
    url: 'https://simplydigital.kz/blogs',
    images: [
      {
        url: 'https://simplydigital.kz/company-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог компании Simply Digital',
    description:
      'Откройте Digital-блог Казахстана — полезные статьи, советы, обзоры. Нужна консультация? Звоните: +7 (775) 202 60 10.',
    images: ['https://simplydigital.kz/company-og.jpg'],
  },
}

export default async function page() {
  const cookieStore = await cookies()
  const locale = resolveLocale(cookieStore.get('lang')?.value)

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  const payloadLocale = locale

  const posts = await payload.find({
    collection: 'posts',
    sort: '-createdAt',
    where: {
      includedInBlog: {
        equals: true,
      },
    },
    user,
    locale: payloadLocale,
  })

  const { component, navigation } = await getHomePageData(locale)
  const blogLabel = navigation?.links?.find((link) => link.url === '/blogs')?.label || 'Блог'
  const requestForm = component.globals.find((block) => block.blockType === 'request-form')

  return (
    <div>
      <BGraphic />
      <FloatingNav nav={navigation} />
      <div className="px-6 md:px-0 pt-8 flex justify-center">
        <Breadcrumbs customLabels={{ blogs: blogLabel }} />
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 p-6 mb-10 lg:px-24 md:auto-rows-fr">
        {posts.docs.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {requestForm && <RequestFormBlock block={requestForm} />}
    </div>
  )
}
