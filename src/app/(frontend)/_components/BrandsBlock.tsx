'use client'

import { Component } from '@/payload-types'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { useTheme } from 'next-themes'

type Props = {
  component: Component
  isLabel?: boolean
}

export default function BrandsBlockBlock({ component, isLabel = false }: Props) {
  const { resolvedTheme } = useTheme()

  return (
    <section className="py-8 md:py-16">
      {component.globals
        .filter((block) => block.blockType === 'brands')
        .map((block, id) => (
          <div key={id} className="flex flex-col gap-12">
            {isLabel && <h1 className="text-4xl text-center pb-10">{block.heading}</h1>}
            <Marquee
              speed={50}
              gradient
              gradientWidth={50}
              gradientColor={resolvedTheme === 'dark' ? '28,28,28' : '255,255,255'}
            >
              {block.logos?.map((item, i) => {
                const logoToUse =
                  resolvedTheme === 'dark' &&
                  typeof item.logoDark === 'object' &&
                  item.logoDark?.url
                    ? item.logoDark
                    : item.logo

                return (
                  <div
                    key={i}
                    className="w-32 h-16 mx-4 md:w-40 md:h-24 md:mx-8 relative flex-shrink-0"
                  >
                    {typeof logoToUse === 'object' && logoToUse.url && (
                      <Image
                        src={logoToUse.url}
                        alt={logoToUse.alt || ''}
                        fill
                        className="object-contain"
                        draggable={false}
                      />
                    )}
                  </div>
                )
              })}
            </Marquee>
          </div>
        ))}
    </section>
  )
}
