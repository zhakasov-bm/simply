import React from 'react'
import './styles.css'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Solution, Subservice } from '@/payload-types'
import { getSolutionData } from '@/app/utils/solutionsService'
import { Providers } from './_components/providers/providers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Simply Digital — Маркетинговое агентство полного цикла',
    template: '%s | Simply Digital — Маркетинговое агентство полного цикла',
  },
  description:
    'Simply Digital — это маркетинговое агентство, которое помогает бизнесу расти через комплексные digital-решения: стратегия, реклама, контент и аналитика.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })

  const navigation = await payload.findGlobal({ slug: 'navigation' })

  // Услуги (solutions) и подуслуги (subservices) через shared service
  let solutions: Solution[] = []
  let subservices: Subservice[] = []
  try {
    // Fetch all solutions (limit 100) and their subservices
    const allSolutionsRes = await payload.find({ collection: 'solutions', limit: 100 })
    solutions = allSolutionsRes.docs
    // For all solutions, fetch subservices and flatten
    const subservicesArr = await Promise.all(
      solutions.map(async (solution) => {
        const { subservices } = await getSolutionData(solution.slug)
        return subservices
      }),
    )
    subservices = subservicesArr.flat()
  } catch (e) {
    console.error('Error fetching solutions or subservices:', e)
  }

  return (
    <html lang="ru" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          <Header nav={navigation} solutions={solutions} subservices={subservices} />
          <main>{children}</main>
          <Footer nav={navigation} solutions={solutions} />
        </Providers>
      </body>
    </html>
  )
}
