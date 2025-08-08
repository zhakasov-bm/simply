import { getHomePageData } from '@/app/utils/homeService'
import BGraphic from '../../_components/BGRaphic'
import ServicesBlock from '../../_components/ServicesBlock'

export const metadata = {
  title: { absolute: 'Услуги компании Simply Digital' },
  description:
    'Услуги компании Simply Digital: комплексный digital-маркетинг, стратегия, реклама, SEO, SMM и аналитика.',
}

export default async function page() {
  const { component, solutions } = await getHomePageData()
  const serviceBlock = component.globals.find((block) => block.blockType === 'services')
  const heading = serviceBlock?.heading || ''

  return (
    <div className="pt-20 md:pt-0">
      <BGraphic />
      <ServicesBlock heading={heading} solutions={solutions} />
    </div>
  )
}
