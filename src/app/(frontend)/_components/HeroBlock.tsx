'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Component } from '@/payload-types'
import UniversalButton from './UniversalButton'
import { usePathname } from 'next/navigation'
import { ALLOWED_CITIES, CITY_PREPOSITIONAL } from '@/app/utils/cities'

export default function HeroBlock({ component }: { component: Component }) {
  const pathname = usePathname()
  const currentCity =
    ALLOWED_CITIES.find((city) => pathname.startsWith(`/${city}`)) || ALLOWED_CITIES[0]
  const cityText = CITY_PREPOSITIONAL[currentCity] || ''

  return (
    <section className="md:py-24">
      {component.globals.map((block, id) => {
        if (block.blockType === 'hero') {
          return (
            <div key={id} className="flex gap-3 container mx-auto px-8 lg:px-16">
              {/* Mobile */}
              <div className="flex flex-col items-center justify-between gap-6 h-auto rounded-custom relative md:hidden bg-container">
                <h1 className="special pt-32">
                  {block.heading} {cityText && <span>{cityText}</span>}
                </h1>
                <div className="flex w-full h-100 justify-center  z-10">
                  {typeof block?.image === 'object' && block.image.url && (
                    <>
                      <Image
                        src="/mobile-hero.svg"
                        alt={block.image.alt}
                        width={0}
                        height={400}
                        priority
                        draggable={false}
                        className="object-contain w-auto h-full"
                      />
                      <div className="absolute bottom-0 h-16 w-full z-10 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                    </>
                  )}{' '}
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center whitespace-nowrap z-20">
                  <Image src="/btn.svg" alt="btn_graphic" width={60} height={60} />
                  <UniversalButton label="Погрузиться в креатив" className="w-auto" />
                </div>
              </div>

              {/* Left */}
              <div className="hidden md:flex flex-col gap-16 flex-8/12">
                <h1 className="md:text-4xl lg:text-6xl font-medium leading-tight">
                  {block.heading} {cityText && <span>{cityText}</span>}
                </h1>

                <div
                  className="hidden h-full px-9 pb-15 md:flex flex-col gap-5 justify-end overflow-hidden lg:relative rounded-custom"
                  style={{
                    backgroundImage: 'url("/bg-hero.svg")',
                    width: '100%',
                    height: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                >
                  <div className="absolute flex top-2 left-0">
                    <Image src="/btn.svg" alt="btn_graphic" width={60} height={60} />
                    <UniversalButton label="Погрузиться в креатив" />
                  </div>
                  <Image
                    src="/graphic.png"
                    alt="graphic"
                    width={500}
                    height={500}
                    className="absolute top-[-120px] right-[-80px] w-[300px]"
                    draggable={false}
                  />
                  <Image
                    src="/star.svg"
                    alt="star"
                    width={500}
                    height={500}
                    className="absolute top-[90px] left-[10px] max-w-fit"
                    draggable={false}
                  />

                  <p className="text-3xl text-white font-extralight leading-tight pr-16">
                    {block.subheading}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="hidden md:flex flex-col gap-3 flex-4/12">
                <div className="w-full md:h-[200px] lg:h-[300px] bg-primary rounded-custom relative">
                  {typeof block?.image === 'object' && block.image.url && (
                    <Image
                      src={block.image.url}
                      alt={block.image.alt}
                      width={360}
                      height={300}
                      priority
                      className="absolute left-1/2 transform -translate-x-1/2 bottom-0"
                      draggable={false}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3 bg-gray-950 rounded-custom p-7">
                  <Link
                    href={block.cta_button.url}
                    className="px-4 py-2 border border-primary/80
                     text-primary/90 text-sm rounded-custom max-w-fit font-light hover:text-primary transition duration-300"
                    draggable={false}
                  >
                    {block.cta_button.label}
                  </Link>
                  <p className="text-white text-lg font-extralight font-inter">{block.turing}</p>
                </div>
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
