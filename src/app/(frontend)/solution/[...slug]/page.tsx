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
import Header from '../../Header/Header'
import BGraphic from '../../_components/BGRaphic'
import Footer from '../../Footer/Footer'
import TrustedByBlock from '../../_components/TrustedByBlock'
import RequestFormBlock from '../../_components/RequestFormBlock'
import QABlock from './_components/QABlock'

export default async function SolutionPage({ params }: { params: { slug: string[] } }) {
  const solutionId = params.slug[0] // Get the first segment of the slug

  const payload = await getPayload({ config: configPromise })
  const navigation = await payload.findGlobal({ slug: 'navigation' })
  const component = await payload.findGlobal({ slug: 'component' })
  const formBlocks = component.globals.filter((block) => block.blockType === 'form')
  const requestForm = component.globals.find((block) => block.blockType === 'request-form')

  const result = await payload.find({
    collection: 'solutions',
    where: {
      slug: {
        equals: solutionId,
      },
    },
  })

  const solution = result.docs[0]

  if (!solution) return notFound()

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

  return (
    <div>
      <BGraphic />
      <Header nav={navigation} />
      <Hero component={component} solution={solution} />
      <LeadCaptureBlock block={formBlocks[0]} />
      <BrandsBlock component={component} />

      <InfoBlock solution={solution} />
      <ProblemBlock solution={solution} />
      <AvailableServices component={component} />

      <WhyUsBlock component={component} />
      <CertificateBlock component={component} />
      <TrustedByBlock component={component} />
      <ReviewBlock component={component} />
      {requestForm && <RequestFormBlock block={requestForm} />}
      <QABlock solution={solution} />
      <Footer nav={navigation} solutions={solutions} />
    </div>
  )
}
