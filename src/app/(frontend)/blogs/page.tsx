import { getPayload } from 'payload'
import config from '@/payload.config'
import BGraphic from '../_components/BGRaphic'
import Breadcrumbs from '../_components/Breadcrumbs/Breadcrumbs'
import { getHomePageData } from '@/app/utils/homeService'
import BlogCard from './components/BlogCard'
import FloatingNav from '../_components/FloatingNav'
import RequestFormBlock from '../_components/RequestFormBlock'

export const metadata = {
  title: { absolute: 'Блог компании Turing IT agency' },
  description:
    'Откройте IT-блог Казахстана на alanturing.app — полезные статьи, советы, обзоры. Нужна консультация? Звоните: +7 (775) 202 60 10.',
  alternates: {
    canonical: `https://alanturing.app/blogs`,
  },
}

export default async function page() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const posts = await payload.find({
    collection: 'posts',
    sort: '-createdAt',
    where: {
      includedInBlog: {
        equals: true,
      },
    },
  })

  const { component, navigation } = await getHomePageData()
  const blogLabel = navigation?.links?.find((link) => link.url === '/blogs')?.label || 'Блог'
  const requestForm = component.globals.find((block) => block.blockType === 'request-form')

  return (
    <div>
      <BGraphic />
      <FloatingNav nav={navigation} />
      <div className="px-6 md:px-0 pt-28 md:pt-8 flex justify-center">
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
