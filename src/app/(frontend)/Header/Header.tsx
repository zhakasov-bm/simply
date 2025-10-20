'use client'

import type { Navigation, Solution, Subservice } from '@/payload-types'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Logo } from '../_components/Logo/Logo'
import { Menu } from 'lucide-react'
import { MobileMenu } from './MobileMenu'
import { FaPhoneAlt } from 'react-icons/fa'
import { PiMapPinFill } from 'react-icons/pi'
import { ALLOWED_CITIES, getCityLabel, getCityRegex } from '@/app/utils/cities'
import { useCurrentCity } from '@/app/utils/useCurrentCity'
import { CityModal } from './CityModal'
import ThemeSwitch from '../_components/ThemeSwitch/ThemeSwitch'
import UniversalButton from '../_components/UniversalButton'
import { ConsultationForm } from '../_components/Modal/ConsultationModal'
import { useAppLocale } from '../_components/providers/providers'
import { LanguageSwitcher } from './LanguageSwitcher'

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
  currentCity: string | null
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
  } else if (link.url === '/blogs') {
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

  const locale = useAppLocale()

  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const [isCityModalOpen, setIsCityModalOpen] = useState(false)

  const [currentCity, setCurrentCity] = useCurrentCity() as readonly [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ]

  const changeCity = (city: string) => {
    setCurrentCity(city)
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCity', city)
    }
    // Если город не выбран в URL, редиректим на /city
    const cityRegex = getCityRegex()
    if (!cityRegex.test(pathname)) {
      router.push(`/${city}`)
    } else {
      const replacedPath = pathname.replace(cityRegex, `/${city}`)
      router.push(replacedPath)
    }
  }

  const pathCity = pathname.split('/')[1] || ''
  const isValidCity = ALLOWED_CITIES.includes(pathCity)
  const cityUrl = isValidCity ? `/${pathCity}` : '/'

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const handleModalSubmit = (data: { name: string; email: string; phone: string }) => {
    setModalOpen(false)
  }

  // Determine if we are on a case page (either /case or /case/[slug])
  const isCasePage = pathname.startsWith('/case')
  // Helper for main page link
  const mainPageHref = `/${currentCity}`

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev)

  const renderSubservicesDropdown = (solution: Solution) => {
    const relatedSubs = subservices.filter(
      (sub) => typeof sub.service === 'object' && sub.service.id === solution.id,
    )

    if (relatedSubs.length === 0) return null

    return (
      <div className="absolute left-full top-0 hidden group-hover/item:flex flex-col rounded-custom bg-inputBG shadow-md p-4 z-30 min-w-[200px]">
        {relatedSubs.map((sub) => (
          <Link
            key={sub.id}
            href={`/${currentCity}/solution/${solution.slug}/${sub.slug}`}
            className="py-1 px-2 rounded-custom hover:bg-link/10 whitespace-nowrap"
            onClick={() => setDropdownOpen(false)}
          >
            {sub.name}
          </Link>
        ))}
      </div>
    )
  }

  const renderServicesDropdown = () => {
    return (
      <div
        className={`absolute top-full left-0 ${
          dropdownOpen ? 'flex' : 'hidden'
        } font-inter flex-col rounded-custom bg-inputBG shadow-md p-4 z-[999] min-w-[200px]`}
      >
        {solutions.map((solution) => {
          const hasSubs = subservices.some(
            (sub) => typeof sub.service === 'object' && sub.service.id === solution.id,
          )

          return (
            <div key={solution.id} className={`relative ${hasSubs ? 'group/item' : ''}`}>
              <Link
                href={`/${currentCity}/solution/${solution.slug}`}
                className="py-1 px-2 rounded-custom hover:bg-link/10 whitespace-nowrap block"
                onClick={() => setDropdownOpen(false)}
              >
                {solution.name}
              </Link>
              {hasSubs && renderSubservicesDropdown(solution)}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <header className="container mx-auto flex justify-between fixed z-[1000] bg-back md:bg-transparent md:static items-center py-4 md:py-5 px-8 md:px-0">
      {/* Left: Logo and Nav */}
      <div className="flex gap-6 md:gap-20 items-center">
        {/* Logo: go to /[city] if on /case or /case/[slug] */}
        <Logo nav={nav} />
        {/* Desktop Menu */}
        <div className="hidden lg:flex justify-around">
          <nav className="flex items-center gap-6 relative">
            {nav.links?.map((link, idx) => {
              const cityRegex = /^\/[a-zа-я-]+/
              const cleanedPath = pathname.replace(cityRegex, '') || '/'

              const isActive =
                link.url === '/'
                  ? pathname === `/${currentCity}` || pathname === '/'
                  : link.url === '/case' || link.url === '/company' || link.url === '/blogs'
                    ? pathname === link.url || pathname.startsWith(link.url + '/')
                    : cleanedPath === link.url || cleanedPath.startsWith(link.url + '/')

              if (link.url === '/solution') {
                return (
                  <div
                    key={idx}
                    className="relative flex items-center"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      onClick={() => {
                        setActiveIdx(idx)
                        setDropdownOpen((prev) => !prev)
                      }}
                      className={`text-sm ${
                        isActive ? 'text-hoverText' : 'text-label'
                      } hover:text-hoverText`}
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
                  className={`text-sm ${isActive ? 'text-hoverText' : 'text-label'} hover:text-hoverText`}
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
          {typeof currentCity === 'string'
            ? getCityLabel(currentCity, locale) || 'Выберите город'
            : 'Выберите город'}
        </button>

        <Link href="tel:+77752026010" className="hidden text-sm md:flex items-center gap-2 group">
          <FaPhoneAlt
            size={16}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          +7 775 202 60 10
        </Link>
        {nav.languageSwitcher && (
          <div className="hidden md:flex items-center">
            <LanguageSwitcher />
          </div>
        )}
        <div className="flex items-center justify-center w-10 h-10 cursor-pointer">
          <ThemeSwitch />
        </div>
        <div className="flex gap-3 md:hidden z-50">
          <UniversalButton
            label="Заказать"
            className="!m-0 !px-4 !py-1 !text-xs"
            onClick={() => setModalOpen(true)}
          />
        </div>
        <ConsultationForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
        />

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
          onOpenCityModal={() => setIsCityModalOpen(true)}
          isMobileOpen={isMobileOpen}
        />
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ease-in-out ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      ></div>

      {isCityModalOpen && (
        <CityModal
          currentCity={currentCity ?? ''}
          onSelect={(city) => {
            changeCity(city)
            setIsCityModalOpen(false)
            setIsMobileOpen(false)
          }}
          onClose={() => setIsCityModalOpen(false)}
        />
      )}
    </header>
  ) //20.10
}
