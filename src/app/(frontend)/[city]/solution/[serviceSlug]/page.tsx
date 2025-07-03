import { notFound } from 'next/navigation'
import { getSolutionData } from '@/app/utils/solutionsService'
import { SolutionPageLayout } from './_components/SolutionPageLayout'

interface PageProps {
  params: Promise<{ serviceSlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SolutionPage({ params }: PageProps) {
  try {
    const { serviceSlug: slug } = await params
    if (!slug) return notFound()

    const { component, solution, subservices, cases, formBlock, requestFormBlock } =
      await getSolutionData(slug)

    return (
      <SolutionPageLayout
        component={component}
        solution={solution}
        subservices={subservices}
        cases={cases}
        formBlock={formBlock}
        requestFormBlock={requestFormBlock}
      />
    )
  } catch (error) {
    console.error('Error in SolutionPage:', error)
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Error loading solution</h1>
        <p className="text-red-600">
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </p>
      </div>
    )
  }
}
