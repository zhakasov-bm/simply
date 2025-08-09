import { getSubserviceData } from '@/app/utils/subservicesService'
import { SubservicePageLayout } from './_components/SubservicePageLayout'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ALLOWED_CITIES } from '@/app/utils/cities'

interface PageProps {
  params: Promise<{ city: string; serviceSlug: string; subSlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Метаданные страницы
export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { city, serviceSlug, subSlug } = await params

  if (!ALLOWED_CITIES.includes(city)) {
    notFound()
  }

  const { subservice } = await getSubserviceData(serviceSlug, subSlug)

  return {
    title: `${subservice.name}`,
    description: subservice.subtitle.substring(0, 160),
    alternates: {
      canonical: `https://simplydigital.kz/${city}/solution/${serviceSlug}/${subSlug}`,
    },
  }
}

export default async function SubservicePage({ params }: PageProps) {
  try {
    const { serviceSlug, subSlug } = await params

    const {
      component,
      service,
      subservice,
      cases,
      formBlock,
      requestFormBlock,
      seoBlocks,
      navigation,
    } = await getSubserviceData(serviceSlug, subSlug)

    return (
      <SubservicePageLayout
        component={component}
        service={service}
        subservice={subservice}
        cases={cases}
        formBlock={formBlock}
        requestFormBlock={requestFormBlock}
        seoBlocks={seoBlocks}
        navigation={navigation}
      />
    )
  } catch (error) {
    console.error('Error in SubservicePage:', error)
    notFound()
  }
}
