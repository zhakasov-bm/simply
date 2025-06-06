import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import { fileURLToPath } from 'url'
import { Solution } from '@/payload-types'

import config from '@/payload.config'
import './styles.css'
import HeroBlock from './_components/HeroBlock'
import AboutUsBlock from './_components/AboutUsBlock'
import TrustedByBlock from './_components/TrustedByBlock'
import LeadCaptureBlock from './_components/LeadCaptureBlock'
import TeamBlock from './_components/TeamBlock'
import CertificateBlock from './_components/CertificateBlock'
import ReviewsBlock from './_components/ReviewsBlock'
import BrandsBlock from './_components/BrandsBlock'
import ServicesBlock from './_components/ServicesBlock'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const component = await payload.findGlobal({ slug: 'component' })

  const serviceBlock = component.globals.find((block) => block.blockType === 'services')
  const heading = serviceBlock?.heading || ''

  const formBlocks = component.globals.filter((block) => block.blockType === 'form')

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  let solutions: Solution[] = []

  try {
    let solutionsRes = await payload.find({
      collection: 'solutions',
      limit: 10,
    })
    solutions = solutionsRes.docs
  } catch (e) {
    console.log(e)
  }

  return (
    <div className="page">
      <HeroBlock component={component} />
      <AboutUsBlock component={component} />
      <ServicesBlock heading={heading} solutions={solutions} />
      <TrustedByBlock component={component} />
      <LeadCaptureBlock block={formBlocks[0]} />
      <CertificateBlock component={component} />
      <BrandsBlock component={component} />
      <LeadCaptureBlock block={formBlocks[1]} />

      <TeamBlock component={component} />

      <ReviewsBlock component={component} />
    </div>
  )
}
