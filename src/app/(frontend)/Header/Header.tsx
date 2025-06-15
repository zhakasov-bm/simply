'use client'

import type { Navigation, Solution, Subservice } from '@/payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '../_components/Logo/Logo'

type NavProps = {
  nav: Navigation
  solutions: Solution[]
  subservices: Subservice[]
}

export default function Header({ nav, solutions, subservices }: NavProps) {
  const pathname = usePathname()
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const renderSubservicesDropdown = (solution: Solution) => {
    const relatedSubs = subservices.filter(
      (sub) => typeof sub.service === 'object' && sub.service.id === solution.id,
    )

    if (relatedSubs.length === 0) return null

    return (
      <div className="absolute left-full top-0 hidden group-hover/item:flex flex-col bg-white shadow-md p-4 z-20 min-w-[200px]">
        {relatedSubs.map((sub) => (
          <Link
            key={sub.id}
            href={`/solution/${solution.slug}/${sub.slug}`}
            className="py-1 px-2 hover:bg-gray-100 whitespace-nowrap"
          >
            {sub.name}
          </Link>
        ))}
      </div>
    )
  }

  const renderServicesDropdown = () => (
    <div className="absolute top-full left-0 hidden font-inter group-hover:flex flex-col bg-white shadow-md p-4 z-10 min-w-[200px]">
      {solutions.map((solution) => {
        const hasSubs = subservices.some(
          (sub) => typeof sub.service === 'object' && sub.service.id === solution.id,
        )

        return (
          <div key={solution.id} className={`relative ${hasSubs ? 'group/item' : ''}`}>
            <Link
              href={`/solution/${solution.slug}`}
              className="py-1 px-2 hover:bg-gray-100 whitespace-nowrap block"
            >
              {solution.name}
            </Link>

            {hasSubs && renderSubservicesDropdown(solution)}
          </div>
        )
      })}
    </div>
  )

  return (
    <header className="container mx-auto flex justify-between items-center py-8">
      <div className="flex gap-20 items-center">
        <Logo nav={nav} />

        <nav className="flex gap-6 relative">
          {nav.links?.map((link, idx) => {
            const isActive = pathname === link.url || activeIdx === idx

            if (link.label === 'Услуги') {
              return (
                <div key={idx} className="relative group">
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className={`text-base ${isActive ? 'text-black' : 'text-black/40'} hover:text-black`}
                  >
                    {link.label}
                  </button>
                  {renderServicesDropdown()}
                </div>
              )
            }

            return (
              <Link
                key={idx}
                href={link.url}
                onClick={() => setActiveIdx(idx)}
                className={`text-base hover:text-black ${isActive ? 'text-black' : 'text-black/40'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-base font-medium">{nav.contacts?.[1]?.item}</span>

        {nav.languageSwitcher && (
          <select className="py-1 text-base font-light">
            <option value="ru">🇷🇺 RU</option>
            <option value="kz">🇰🇿 KZ</option>
            <option value="en">🇬🇧 EN</option>
          </select>
        )}

        <button className="w-6 h-6 rounded-full border border-gray-400" title="Toggle Dark Mode">
          🌓
        </button>
      </div>
    </header>
  )
}
