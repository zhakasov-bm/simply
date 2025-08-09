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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        url: 'https://simplydigital.kz',
        name: 'Simply Digital Marketing Agency',
        description:
          'Digital-маркетинг, создание и продвижение сайтов, SMM, таргетированная и контекстная реклама.',
        publisher: { '@id': 'https://simplydigital.kz/#organization' },
      },
      {
        '@type': 'Organization',
        '@id': 'https://simplydigital.kz//#organization',
        name: 'Simply Digital Marketing Agency',
        url: 'https://simplydigital.kz/',
        logo: 'https://simplydigital.kz//company-og.jpg',
        sameAs: ['https://www.instagram.com/simplydigital.kz'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Маркова, д. 24а',
          addressLocality: 'Алматы',
          postalCode: '050000',
          addressCountry: 'KZ',
        },

        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+7 775 202 60 10',
            contactType: 'customer support',
          },
        ],
      },
    ],
  }

  const { children } = props

  const { navigation, solutions } = await getHomePageData()
  const subservices = await getAllSubservices()

  return (
    <html lang="ru" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
