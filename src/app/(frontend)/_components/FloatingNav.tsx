'use client'
import Image from 'next/image'
import { Navigation } from '@/payload-types'
import ThemeSwitch from './ThemeSwitch/ThemeSwitch'
import { IoArrowUpOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { handleScroll } from '@/app/utils/scroll'
import { useEffect, useState } from 'react'
import { Logo } from './Logo/Logo'

export default function FloatingNav({ nav }: { nav: Navigation }) {
  const [visibleNavItems, setVisibleNavItems] = useState<
    NonNullable<(typeof nav.floatNav)[0]['navigation']>
  >([])

  useEffect(() => {
    const navigationItems = nav.floatNav[0].navigation ?? []

    const availableItems = navigationItems.filter((item) => {
      if (!item?.scrollTo) return false
      const el = document.getElementById(item.scrollTo)
      return el !== null
    })

    setVisibleNavItems(availableItems)
  }, [nav.floatNav])

  return (
    <div className="hidden md:block fixed bottom-16 left-1/2 -translate-x-1/2 z-[100] text-base font-inter">
      <div className="flex items-center gap-5 w-fit border border-black/20 bg-white/30 backdrop-blur-sm rounded-full text-black/40 py-2 px-6">
        <div className="w-24 h-auto">
          <Logo nav={nav} />
        </div>
        <div>|</div>
        <nav className="flex items-center gap-3">
          {visibleNavItems.map((item, id) => (
            <div
              key={id}
              onClick={() => item.scrollTo && handleScroll(item.scrollTo)}
              className="cursor-pointer hover:text-black whitespace-nowrap"
            >
              {item.nav}
            </div>
          ))}
        </nav>

        <motion.div
          whileTap={{ scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="cursor-pointer relative group"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <IoArrowUpOutline className="text-xl" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            Наверх
          </span>
        </motion.div>

        <ThemeSwitch />
        <button
          className="text-sm font-unbounded text-primary bg-black hover:text-white rounded-custom px-3 py-2 cursor-pointer"
          onClick={() => handleScroll('contact')}
        >
          {nav.floatNav[0].button}
        </button>
      </div>
    </div>
  )
}
