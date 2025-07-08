'use client'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'
import { Navigation } from '@/payload-types'
import ThemeSwitch from './ThemeSwitch/ThemeSwitch'

export default function FloatingNav({ nav }: { nav: Navigation }) {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="hidden md:block fixed bottom-16 left-1/2 transform -translate-x-1/2 text-base font-inter z-100">
      <div className="flex gap-5 items-center w-fit border border-black/20 bg-white/30 backdrop-blur-[2px] rounded-full text-black/40 py-2 px-6">
        {typeof nav.logo === 'object' && nav.logo.url && (
          <Image
            src={nav.logo.url}
            alt={nav.logo.alt || ''}
            width={90}
            height={40}
            draggable={false}
            onClick={() => handleScroll('hero')}
          />
        )}
        {nav.floatNav.map((block, id) => {
          if (block.blockType === 'floating-nav') {
            return (
              <div key={id} className="flex gap-3 items-center">
                {block.navigation?.map((item, id) => (
                  <div
                    key={id}
                    onClick={() => handleScroll(`${item.scrollTo}`)}
                    className="cursor-pointer hover:text-black"
                  >
                    {item.nav}
                  </div>
                ))}
                <ThemeSwitch />
                <button
                  className="text-sm font-unbounded text-primary bg-black hover:text-white rounded-custom px-3 py-2 cursor-pointer"
                  onClick={() => handleScroll('contact')}
                >
                  {block.button}
                </button>
                {/* <IoClose width={100} height={100} className="cursor-pointer" /> */}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
