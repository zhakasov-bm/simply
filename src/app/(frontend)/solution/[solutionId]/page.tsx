import { Solution } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import Image from 'next/image'
import TeamBlock from '../../_components/TeamBlock'
import ReviewBlock from '../../_components/ReviewsBlock'
import CertificateBlock from '../../_components/CertificateBlock'
import BrandsBlock from '../../_components/BrandsBlock'
import InfoBlock from './_components/InfoBlock'
import ProblemBlock from '../components/ProblemBlock'
import LeadCaptureBlock from '../../_components/LeadCaptureBlock'
import Hero from './_components/Hero'
import WhyUsBlock from './_components/WhyUsBlock'
import AvailableServices from './_components/AvailableServices'
import { block } from 'sharp'

export default async function SolutionPage({ params }: { params: { solutionId: string } }) {
  const { solutionId } = await params

  const payload = await getPayload({ config: configPromise })
  const component = await payload.findGlobal({ slug: 'component' })
  const formBlocks = component.globals.filter((block) => block.blockType === 'form')

  let solution: Solution | null = null

  try {
    const res = await payload.findByID({
      collection: 'solutions',
      id: solutionId,
    })

    solution = res
  } catch (err) {
    console.error(err)
    return notFound()
  }

  if (!solution) {
    return notFound()
  }

  return (
    <div>
      <Hero component={component} solution={solution} />
      <LeadCaptureBlock block={formBlocks[0]} />
      <BrandsBlock component={component} />

      <InfoBlock solution={solution} />
      <ProblemBlock solution={solution} />
      <AvailableServices component={component} />
      <TeamBlock component={component} />
      <ReviewBlock component={component} />
      <WhyUsBlock component={component} />
      <CertificateBlock component={component} />
    </div>
  )
}
