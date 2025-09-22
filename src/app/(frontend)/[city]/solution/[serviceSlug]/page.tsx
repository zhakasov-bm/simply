import { notFound } from 'next/navigation'
import { getSolutionData } from '@/app/utils/solutionsService'
import { SolutionPageLayout } from './_components/SolutionPageLayout'
import { Metadata } from 'next'
import { ALLOWED_CITIES } from '@/app/utils/cities'
import { cookies } from 'next/headers'
import { resolveLocale } from '@/app/utils/locale'

interface PageProps {
  params: Promise<{ city: string; serviceSlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Метаданные страницы 23.09
export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { city, serviceSlug: slug } = await params

  const cookieStore = await cookies()
  const locale = resolveLocale(cookieStore.get('lang')?.value)

  const { solution } = await getSolutionData(slug, locale)

  const imageUrl = typeof solution.icon === 'string' ? solution.icon : solution.icon?.url || ''

  return {
    title: `${solution.name}`,
    description: solution.subtitle.substring(0, 160),
    alternates: {
      canonical: `https://simplydigital.kz/${city}/solution/${slug}`,
    },
    openGraph: {
      title: solution.name,
      description: solution.subtitle ?? '',
      url: `https://simplydigital.kz/${city}/solution/${slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: solution.name,
      description: solution.subtitle ?? '',
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function SolutionPage({ params }: PageProps) {
  try {
    const { city, serviceSlug: slug } = await params

    if (!ALLOWED_CITIES.includes(city)) {
      notFound()
    }

    const cookieStore = await cookies()
    const locale = resolveLocale(cookieStore.get('lang')?.value)

    const { component, solution, subservices, cases, formBlock, navigation } =
      await getSolutionData(slug, locale)

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
