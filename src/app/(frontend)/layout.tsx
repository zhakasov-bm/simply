import React from 'react'
import './styles.css'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Providers } from './_components/providers/providers'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getHomePageData } from '../utils/homeService'
import { getAllSubservices } from '../utils/getAllSubservices'
import { resolveLocale } from '../utils/locale'

interface RootLayoutProps {
  children: React.ReactNode
  params?: Promise<{ city?: string }>
}

export const metadata: Metadata = {
  title: {
    default: 'Simply Digital — Маркетинговое агентство полного цикла',
    template: '%s | Simply Digital — Маркетинговое агентство полного цикла',
  },
  description:
    'Simply Digital — это маркетинговое агентство, которое помогает бизнесу расти через комплексные digital-решения: стратегия, реклама, контент и аналитика.',
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const cookieStore = await cookies()
  const locale = resolveLocale(cookieStore.get('lang')?.value)

  const resolvedParams = params ? await params : {}

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

  const { navigation, solutions } = await getHomePageData(locale)
  const subservices = await getAllSubservices(locale)

  const currentCity = resolvedParams.city || 'almaty'
  const pathname = `/${currentCity}`

  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers locale={locale}>
          <Header nav={navigation} solutions={solutions} subservices={subservices} />
          <main className="pt-20 md:pt-0">{children}</main>
          <Footer
            nav={navigation}
            solutions={solutions}
            currentCity={currentCity}
            pathname={pathname}
          />
        </Providers>
      </body>
    </html>
  )
}
