import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { city: string }
}): Promise<Metadata> {
  const city = params.city[0].toUpperCase() + params.city.slice(1)

  return {
    title: `Услуги digital-агентства в ${city}`,
    description: `Продвижение, сайты, брендинг в ${city}. SMM, контекст, креатив — всё под ключ.`,
  }
}
