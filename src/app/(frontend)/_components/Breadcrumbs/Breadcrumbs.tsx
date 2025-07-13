'use client'

import Link from 'next/link'
import { useBreadcrumbs } from '@/app/utils/useBreadcrumbs'

interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
  showHome?: boolean
  customLabels?: Record<string, string>
}

export default function Breadcrumbs({
  items,
  className = '',
  showHome = true,
  customLabels = {},
}: BreadcrumbsProps) {
  // Используем хук для получения breadcrumbs
  const breadcrumbItems = useBreadcrumbs({ items, showHome, customLabels })

  if (breadcrumbItems.length === 0) {
    return null
  }

  // Создаем структурированные данные для SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href
        ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}${item.href}`
        : undefined,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav
        className={`flex items-center space-x-2 text-sm text-link/60 ${className}`}
        aria-label="Breadcrumb"
        role="navigation"
      >
        <ol className="flex items-center space-x-2 font-inter">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {item.href && !item.isActive ? (
                <Link
                  href={item.href}
                  className="text-xs md:text-sm hover:text-link transition-colors duration-200 focus:outline-none"
                  aria-current={index === breadcrumbItems.length - 1 ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={item.isActive ? 'text-link font-medium' : 'text-link/60'}
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
