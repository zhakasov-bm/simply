import React from 'react'
import './styles.css'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Solution, Subservice } from '@/payload-types'

export const metadata = {
  description: 'Marketing agency',
  title: 'Simply Digital',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })

  // Навигация
  const navigation = await payload.findGlobal({ slug: 'navigation' })

  // Услуги (solutions)
  let solutions: Solution[] = []
  try {
    const solutionsRes = await payload.find({
      collection: 'solutions',
      limit: 100,
    })
    solutions = solutionsRes.docs
  } catch (e) {
    console.error('Error fetching solutions:', e)
  }

  // Подуслуги (subservices)
  let subservices: Subservice[] = []
  try {
    const subservicesRes = await payload.find({
      collection: 'subservices',
      limit: 100,
    })

    subservices = subservicesRes.docs.map((sub) => ({
      ...sub,
      icon:
        typeof sub.icon === 'object' && sub.icon
          ? {
              ...sub.icon,
              url: sub.icon.url || '',
              alt: sub.icon.alt || '',
            }
          : sub.icon,
    }))
  } catch (e) {
    console.error('Error fetching subservices:', e)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header nav={navigation} solutions={solutions} subservices={subservices} />
        <main>{children}</main>
        <Footer nav={navigation} solutions={solutions} />
      </body>
    </html>
  )
}
