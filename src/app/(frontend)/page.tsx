import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import { Solution, Case } from '@/payload-types'

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
import CasesBlock from './_components/CasesBlock'
import BGraphic from './_components/BGRaphic'
import RequestFormBlock from './_components/RequestFormBlock'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const component = await payload.findGlobal({ slug: 'component' })

  const serviceBlock = component.globals.find((block) => block.blockType === 'services')
  const heading = serviceBlock?.heading || ''

  const formBlocks = component.globals.filter((block) => block.blockType === 'form')
  const requestForm = component.globals.find((block) => block.blockType === 'request-form')

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  let solutions: Solution[] = []

  try {
    const solutionsRes = await payload.find({
      collection: 'solutions',
      limit: 10,
    })
    solutions = solutionsRes.docs
  } catch (e) {
    console.log(e)
  }

  let cases: Case[] = []

  try {
    const casesRes = await payload.find({
      collection: 'cases',
      limit: 10,
    })
    cases = casesRes.docs
  } catch (e) {
    console.log(e)
  }

  return (
    <div>
      <BGraphic />
      <HeroBlock component={component} />
      <div className="block md:hidden">
        <BrandsBlock component={component} isLabel={false} />
      </div>
      <AboutUsBlock component={component} />
      <ServicesBlock heading={heading} solutions={solutions} />
      <TrustedByBlock component={component} />
      <CasesBlock heading="Кейсы – истории, которые мы создали" cases={cases} type="slider" />
      <LeadCaptureBlock block={formBlocks[0]} />
      <CertificateBlock component={component} />
      <div className="hidden md:block">
        <BrandsBlock component={component} isLabel={true} />
        <LeadCaptureBlock block={formBlocks[1]} />
      </div>
      <TeamBlock component={component} />
      <ReviewsBlock component={component} />
      {requestForm && <RequestFormBlock block={requestForm} />}
    </div>
  )
}
