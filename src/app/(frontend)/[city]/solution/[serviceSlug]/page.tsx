import { notFound } from 'next/navigation'
import { getSolutionData } from '@/app/utils/solutionsService'
import { SolutionPageLayout } from './_components/SolutionPageLayout'
import { Metadata } from 'next'
import { ALLOWED_CITIES } from '@/app/utils/cities'

interface PageProps {
  params: Promise<{ city: string; serviceSlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Метаданные страницы
export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { city, serviceSlug: slug } = await params

  const { solution } = await getSolutionData(slug)

  return {
    title: `${solution.name}`,
    description: solution.subtitle.substring(0, 160),
    alternates: {
      canonical: `https://simplydigital.kz/${city}/solution/${slug}`,
    },
  }
}

export default async function SolutionPage({ params }: PageProps) {
  try {
    const { city, serviceSlug: slug } = await params

    if (!ALLOWED_CITIES.includes(city)) {
      notFound()
    }

    const { component, solution, subservices, cases, formBlock, navigation } =
      await getSolutionData(slug)

    return (
      <SolutionPageLayout
        component={component}
        solution={solution}
        subservices={subservices}
        cases={cases}
        formBlock={formBlock}
        navigation={navigation}
      />
    )
  } catch (error) {
    console.error('Error in SolutionPage:', error)
    notFound()
  }
}
