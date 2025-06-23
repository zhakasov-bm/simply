'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import type { Navigation, Solution, Subservice } from '@/payload-types'

type Props = {
  nav: Navigation
  solutions: Solution[]
  subservices: Subservice[]
  toggleMobileMenu: () => void
  isMobileOpen: boolean
}

export function MobileMenu({ nav, solutions, subservices, toggleMobileMenu, isMobileOpen }: Props) {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [openSolutionId, setOpenSolutionId] = useState<string | null>(null)

  const toggleSolution = (id: string) => {
    setOpenSolutionId((prev) => (prev === id ? null : id))
  }

  return (
    isMobileOpen && (
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg font-inter z-500 px-8 py-10 flex flex-col gap-4 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-end items-center mb-4">
          <button onClick={toggleMobileMenu}>
            <X size={40} />
          </button>
        </div>

        {/* Main nav links */}
        {nav.links?.map((link, idx) => {
          const isServices = link.label === 'Услуги'

          return (
            <div key={idx}>
              {isServices ? (
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex justify-between items-center text-left text-transform: uppercase font-medium text-xl text-black rounded-2xl active:bg-lightBG"
                >
                  {link.label}
                  {servicesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              ) : (
                <Link
                  href={link.url}
                  onClick={toggleMobileMenu}
                  className="w-full flex justify-between items-center text-left text-transform: uppercase font-medium text-xl text-black rounded-2xl active:bg-lightBG"
                >
                  {link.label}
                </Link>
              )}

              {/* Services Dropdown */}
              {isServices && servicesOpen && (
                <div className="pl-4 mt-2 flex flex-col gap-4">
                  {solutions.map((solution) => {
                    const relatedSubs = subservices.filter(
                      (sub) => typeof sub.service === 'object' && sub.service.id === solution.id,
                    )

                    const isOpen = openSolutionId === solution.id

                    return (
                      <div key={solution.id} className="flex flex-col gap-4">
                        {relatedSubs.length === 0 ? (
                          <Link
                            href={`/solution/${solution.slug}`}
                            onClick={toggleMobileMenu}
                            className="w-full text-left pr-4 rounded-2xl active:bg-lightBG"
                          >
                            {solution.name}
                          </Link>
                        ) : (
                          <button
                            onClick={() => toggleSolution(solution.id)}
                            className={`flex justify-between items-center w-full text-left rounded-2xl active:bg-lightBG ${isOpen ? 'font-medium' : ''}`}
                          >
                            <span>{solution.name}</span>
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        )}

                        {/* Subservices */}
                        {isOpen && relatedSubs.length > 0 && (
                          <div className="pl-4 flex flex-col gap-1">
                            {relatedSubs.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/solution/${solution.slug}/${sub.slug}`}
                                onClick={toggleMobileMenu}
                                className="rounded-2xl active:bg-lightBG"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  )
}
