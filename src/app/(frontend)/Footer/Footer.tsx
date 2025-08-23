// components/Footer/Footer.tsx
import type { Navigation, Solution } from '@/payload-types'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { Logo } from '../_components/Logo/Logo'

type Props = {
  nav: Navigation
  solutions: Solution[]
  currentCity: string
  pathname: string
}

// Helper: returns true if the link should be active for the current path
function isNavLinkActive(linkUrl: string, pathname: string, currentCity: string): boolean {
  const cityRegex = /^\/[a-zа-я-]+/
  const cleanedPath = pathname.replace(cityRegex, '') || '/'

  if (linkUrl === '/') {
    return pathname === `/${currentCity}` || pathname === '/'
  }
  const regex = new RegExp(`^${linkUrl}(\/|$)`)
  return regex.test(cleanedPath)
}

export default function Footer({ nav, solutions, currentCity, pathname }: Props) {
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
      if (cat) {
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(item)
      }
      return acc
    },
    {} as Record<string, Solution[]>,
  )

  return (
    <footer className="py-8 border-t border-link/10">
      <div className="container mx-auto flex flex-wrap justify-between px-8 py-8">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <div className="hidden md:block">
            <Logo nav={nav} />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-2xl py-2">{nav.contactTitle}</h3>
            {nav.contacts?.map((contact, id) => (
              <p key={id} className="font-light text-base text-link/40">
                {contact.item}
              </p>
            ))}
          </div>

          <div className="flex gap-3">
            {nav.socialMedia?.map(({ platform, url }) => {
              const Icon = icons[platform]
              return (
                <Link key={platform} href={url} target="_blank" rel="noreferrer">
                  <Icon
                    size={48}
                    className="bg-background rounded-xl p-3 hover:bg-primary transition duration-300"
                  />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex flex-col gap-2">
          <h3 className="text-2xl py-2">Компания</h3>
          {nav.links?.map((link, idx) => {
            const isActive = isNavLinkActive(link.url, pathname, currentCity)
            return (
              <Link
                key={idx}
                href={link.url}
                className={`text-sm font-light hover:text-link ${isActive ? 'text-link' : 'text-link/40'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Services */}
        <div className="hidden pt-16 md:pt-0 md:flex flex-col gap-4">
          <h3 className="text-2xl py-2">Услуги</h3>
          {Object.entries(groupedSolutions).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-sm font-normal text-link">{getCategoryLabel(category)}</h2>
              <ul className="space-y-1">
                {items.map((solution) => (
                  <li key={solution.id}>
                    <Link
                      href={`/${currentCity}/solution/${solution.slug}`}
                      className={`text-sm font-light hover:text-link ${
                        pathname === `/${currentCity}/solution/${solution.slug}`
                          ? 'text-link'
                          : 'text-link/40'
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
