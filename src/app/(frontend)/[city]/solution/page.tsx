import { getHomePageData } from '@/app/utils/homeService'
import BGraphic from '../../_components/BGRaphic'
import ServicesBlock from '../../_components/ServicesBlock'

interface PageProps {
  params: Promise<{ city: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function page({ params }: PageProps) {
  const { component, solutions } = await getHomePageData()
  const serviceBlock = component.globals.find((block) => block.blockType === 'services')
  const heading = serviceBlock?.heading || ''

  return (
    <div>
      <BGraphic />
      <ServicesBlock heading={heading} solutions={solutions} />
    </div>
  )
}
