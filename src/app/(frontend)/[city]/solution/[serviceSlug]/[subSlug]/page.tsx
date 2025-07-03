import { getSubserviceData } from '@/app/utils/subservicesService'
import { SubservicePageLayout } from './_components/SubservicePageLayout'

interface PageProps {
  params: Promise<{ serviceSlug: string; subSlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SubservicePage({ params }: PageProps) {
  try {
    const { serviceSlug, subSlug } = await params

    const { component, service, subservice, cases, formBlock, requestFormBlock, seoBlocks } =
      await getSubserviceData(serviceSlug, subSlug)

    return (
      <SubservicePageLayout
        component={component}
        service={service}
        subservice={subservice}
        cases={cases}
        formBlock={formBlock}
        requestFormBlock={requestFormBlock}
        seoBlocks={seoBlocks}
      />
    )
  } catch (error) {
    console.error('Error in SubservicePage:', error)
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Error loading subservice</h1>
        <p className="text-red-600">
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </p>
      </div>
    )
  }
}
