// components/Header.tsx

'use client'

import type { Navigation } from '@/payload-types'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '../_components/Logo/Logo'

export default function Header({ nav }: { nav: Navigation }) {
  const pathname = usePathname()
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <header className="container mx-auto flex justify-between items-center py-8">
      <div className="flex gap-20 items-center">
        {/* Logo */}
        <Logo nav={nav} />

        {/* Navigation */}
        <nav className="flex gap-6">
          {nav.links?.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              onClick={() => setActiveIdx(idx)}
              className={`text-base hover:text-black ${
                pathname === link.url || activeIdx === idx ? 'text-black' : 'text-black/40'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <span className="text-base font-medium">{nav.contacts[1].item}</span>

        {nav.languageSwitcher && (
          <select className="py-1 text-base font-light">
            <option value="ru">🇷🇺 RU</option>
            <option value="kz">🇰🇿 KZ</option>
            <option value="en">🇬🇧 EN</option>
          </select>
        )}

        {/* {header.darkModeToggle && ( */}
        <button className="w-6 h-6 rounded-full border border-gray-400" title="Toggle Dark Mode">
          🌓
        </button>
        {/* )} */}
      </div>
    </header>
  )
}
