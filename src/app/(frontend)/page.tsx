import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import { Page } from '@/payload-types'

import config from '@/payload.config'
import './styles.css'
import HeroBlock from './components/HeroBlock'
import AboutUsBlock from './components/AboutUsBlock'
import TrustedByBlock from './components/TrustedByBlock'
import LeadCaptureBlock from './components/LeadCaptureBlock'
import TeamBlock from './components/TeamBlock'
import CertificateBlock from './components/CertificateBlock'
import ReviewsBlock from './components/ReviewsBlock'
import BrandsBlock from './components/BrandsBlock'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'main' },
    },
  })

  if (!page) {
    return <div className="text-blue-400">Not Found</div>
  }

  const renderBlocks = (block: Page['layout'][0]) => {
    switch (block.blockType) {
      case 'hero':
        return <HeroBlock block={block} key={block.id} />
      case 'about':
        return <AboutUsBlock block={block} key={block.id} />
      case 'trusted-by':
        return <TrustedByBlock block={block} key={block.id} />
      case 'form':
        return <LeadCaptureBlock block={block} key={block.id} />
      case 'team':
        return <TeamBlock block={block} key={block.id} />
      case 'certificate':
        return <CertificateBlock block={block} key={block.id} />
      case 'reviews':
        return <ReviewsBlock block={block} key={block.id} />
      case 'brands':
        return <BrandsBlock block={block} key={block.id} />
      // case 'services':
      //   return <ServicesBlock block={block} key={block.id} />
      default:
        return null
    }
  }

  return (
    <div>
      <div className="page">{page.layout?.map((block) => renderBlocks(block))}</div>
    </div>
  )
}
