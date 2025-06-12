// components/Header.tsx

'use client'

import type { Navigation, Solution } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { Logo } from '../_components/Logo/Logo'

type Props = {
  nav: Navigation
  solutions: Solution[]
}

export default function Footer({ nav, solutions }: Props) {
  const pathname = usePathname()
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const icons = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    telegram: FaTelegram,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
  }

  const getCategoryLabel = (value: string): string => {
    const labels: Record<string, string> = {
      content: 'Креатив и Контент',
      pr: 'Продвижение и PR',
      brand: 'Стратегия и Бренд',
      website: 'Сайты и Технологии',
    }

    return labels[value] || value
  }

  // Group solutions by category
  const groupedSolutions = solutions.reduce(
    (acc, item) => {
      const cat = item.category
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(item)
      return acc
    },
    {} as Record<string, Solution[]>,
  )

  return (
    <footer className="py-8 border-t border-gray-100">
      <div className="container mx-auto flex justify-between py-8">
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <Logo nav={nav} />

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl py-2">{nav.contactTitle}</h1>
            {nav.contacts?.map((contact, id) => (
              <div key={id}>
                <p className="font-light text-base text-gray-500">{contact.item}</p>
              </div>
            ))}
          </div>

          {/* SocialMedia */}
          <div className="flex gap-3">
            {nav.socialMedia?.map(({ platform, url }) => {
              const Icon = icons[platform]
              return (
                <a key={platform} href={url} target="_blank" rel="noreferrer">
                  <Icon
                    size={48}
                    className="bg-lightBG rounded-xl p-3 hover:bg-gray-300 transition duration-300"
                  />
                </a>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <h1 className="text-2xl py-2">Компания</h1>
          {nav.links?.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              onClick={() => setActiveIdx(idx)}
              className={`text-sm font-light hover:text-black ${
                pathname === link.url || activeIdx === idx ? 'text-black' : 'text-black/40'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Services */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl py-2">Услуги</h1>

          {Object.entries(groupedSolutions).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-sm font-normal text-black">{getCategoryLabel(category)}</h2>
              <ul className="space-y-1">
                {items.map((solution) => (
                  <li key={solution.id}>
                    <Link
                      href={`/solution/${solution.slug}`} // better use slug
                      className={`text-sm font-light hover:text-black ${
                        pathname === `/solution/${solution.slug}` ? 'text-black' : 'text-black/40'
                      }`}
                    >
                      {solution.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-gray-500 font-light py-4">© simplydigital</div>
    </footer>
  )
}
