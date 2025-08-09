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
import { getHomePageData } from '../utils/homeService'
import { getAllSubservices } from '../utils/getAllSubservices'

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

  const { navigation, solutions } = await getHomePageData()
  const subservices = await getAllSubservices()

  return (
    <html lang="ru" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          <Header nav={navigation} solutions={solutions} subservices={subservices} />
          <main className="pt-20 md:pt-0">{children}</main>
          <Footer nav={navigation} solutions={solutions} />
        </Providers>
      </body>
    </html>
  )
}
