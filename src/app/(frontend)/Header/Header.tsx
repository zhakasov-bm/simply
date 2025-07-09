'use client'

import type { Navigation, Solution, Subservice } from '@/payload-types'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '../_components/Logo/Logo'
import { Menu } from 'lucide-react'
import { MobileMenu } from './MobileMenu'
import { FaPhoneAlt } from 'react-icons/fa'
import { PiMapPinFill } from 'react-icons/pi'
import { CITY_RU, getCityRegex } from '@/app/utils/cities'
import { useCurrentCity } from '@/app/utils/useCurrentCity'
import { CityModal } from './CityModal'
import ThemeSwitch from '../_components/ThemeSwitch/ThemeSwitch'

type NavProps = {
  nav: Navigation
  solutions: Solution[]
  subservices: Subservice[]
}

// Helper to get nav link props for both desktop and mobile
type GetNavLinkPropsArgs = {
  link: { label: string; url: string }
  idx: number
  pathname: string
  activeIdx: number | null
  currentCity: string
  isCasePage: boolean
  mainPageHref: string
  setActiveIdx?: ((idx: number) => void) | undefined
}

export function getNavLinkProps(args: GetNavLinkPropsArgs) {
  const { link, idx, currentCity, isCasePage, mainPageHref, setActiveIdx } = args
  let href = `/${currentCity}${link.url}`
  let onClick = () => setActiveIdx && setActiveIdx(idx)

  if (link.label === 'Главная') {
    href = isCasePage ? mainPageHref : `/${currentCity}${link.url}`
  } else if (link.url === '/company') {
    href = link.url
  } else if (link.url.startsWith('http')) {
    href = link.url
  } else if (link.url === '/case' || link.url.startsWith('/case/')) {
    href = link.url
  }

  return { href, onClick }
}

export default function Header({ nav, solutions, subservices }: NavProps) {
  const pathname = usePathname()
  console.log(pathname)
  const router = useRouter()
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const [isCityModalOpen, setIsCityModalOpen] = useState(false)

  const [currentCity, setCurrentCity] = useCurrentCity()

  // Determine if we are on a case page (either /case or /case/[slug])
  const isCasePage = pathname.startsWith('/case')
  // Helper for main page link
  const mainPageHref = `/${currentCity}`

  const changeCity = (city: string) => {
    setCurrentCity(city)
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCity', city)
    }
    const cityRegex = getCityRegex()
    if (isCasePage) {
      router.push(`/${city}`)
    } else {
      const replacedPath = pathname.replace(cityRegex, `/${city}`)
      router.push(replacedPath)
    }
  }

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev)

  const renderSubservicesDropdown = (solution: Solution) => {
    const relatedSubs = subservices.filter(
      (sub) => typeof sub.service === 'object' && sub.service.id === solution.id,
    )

    if (relatedSubs.length === 0) return null

    return (
      <div className="absolute left-full top-0 hidden group-hover/item:flex flex-col rounded-custom bg-inputBG shadow-md p-4 z-20 min-w-[200px]">
        {relatedSubs.map((sub) => (
          <Link
            key={sub.id}
            href={`/${currentCity}/solution/${solution.slug}/${sub.slug}`}
            className="py-1 px-2 rounded-custom hover:bg-link/10 whitespace-nowrap"
          >
            {sub.name}
          </Link>
        ))}
      </div>
    )
  }

  const renderServicesDropdown = () => (
    <div className="absolute top-full left-0 hidden font-inter group-hover:flex flex-col rounded-custom bg-inputBG shadow-md p-4 z-100 min-w-[200px]">
      {solutions.map((solution) => {
        const hasSubs = subservices.some(
          (sub) => typeof sub.service === 'object' && sub.service.id === solution.id,
        )

        return (
          <div key={solution.id} className={`relative ${hasSubs ? 'group/item' : ''}`}>
            <Link
              href={`/${currentCity}/solution/${solution.slug}`}
              className="py-1 px-2 rounded-custom hover:bg-link/10 whitespace-nowrap block"
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
    <header className="container mx-auto flex justify-between fixed z-[1000] bg-back md:bg-transparent md:static items-center py-4 md:py-5 px-8 md:px-0">
      {/* Left: Logo and Nav */}
      <div className="flex gap-6 md:gap-20 items-center">
        {/* Logo: go to /[city] if on /case or /case/[slug] */}
        <Link href={isCasePage ? mainPageHref : `/${currentCity}`}>
          <Logo nav={nav} />
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-around">
          <nav className="flex gap-6 relative">
            {nav.links?.map((link, idx) => {
              const cityRegex = /^\/[a-zа-я-]+/
              const cleanedPath = pathname.replace(cityRegex, '') || '/'

              const isActive =
                link.url === '/'
                  ? pathname === `/${currentCity}` || pathname === '/'
                  : link.url === '/case' || link.url === '/company'
                    ? pathname === link.url || pathname.startsWith(link.url + '/')
                    : cleanedPath === link.url || cleanedPath.startsWith(link.url + '/')

              if (link.label === 'Услуги') {
                return (
                  <div key={idx} className="relative group">
                    <button
                      onClick={() => setActiveIdx(idx)}
                      className={`text-base ${isActive ? 'text-hoverText' : 'text-label'} hover:text-hoverText`}
                    >
                      {link.label}
                    </button>
                    {renderServicesDropdown()}
                  </div>
                )
              }

              const props = getNavLinkProps({
                link,
                idx,
                pathname,
                activeIdx,
                currentCity,
                isCasePage,
                mainPageHref,
                setActiveIdx,
              })

              return (
                <Link
                  key={idx}
                  {...props}
                  className={`text-base ${isActive ? 'text-hoverText' : 'text-label'} hover:text-hoverText`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
      {/* Right: City Selector, Phone number */}
      <div className="flex gap-2 md:gap-5">
        <button
          className="hidden md:flex text-base font-inter text-hoverText underline decoration-dashed items-center gap-0 cursor-pointer"
          onClick={() => setIsCityModalOpen(true)}
        >
          <PiMapPinFill />
          {CITY_RU[currentCity]}
        </button>

        <Link href="tel:+77752026010" className="hidden text-base md:flex items-center gap-2 group">
          <FaPhoneAlt
            size={20}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          +7 775 202 60 10
        </Link>
        <div className="flex items-center justify-center w-10 h-10 cursor-pointer">
          <ThemeSwitch />
        </div>

        {/* Burger button (mobile only) */}
        <button className="md:hidden z-50" onClick={toggleMobileMenu}>
          {isMobileOpen ? '' : <Menu size={40} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 bg-white shadow-lg font-inter z-50 px-8 py-10 flex flex-col gap-4
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}
          ${isMobileOpen ? '' : 'pointer-events-none'}
        `}
        style={{ visibility: isMobileOpen ? 'visible' : 'hidden' }}
      >
        <MobileMenu
          nav={nav}
          solutions={solutions}
          subservices={subservices}
          toggleMobileMenu={toggleMobileMenu}
          isMobileOpen={isMobileOpen}
        />
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ease-in-out ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      ></div>

      {isCityModalOpen && (
        <CityModal
          currentCity={currentCity}
          onSelect={(city) => {
            changeCity(city)
            setIsCityModalOpen(false)
          }}
          onClose={() => setIsCityModalOpen(false)}
        />
      )}
    </header>
  )
}
