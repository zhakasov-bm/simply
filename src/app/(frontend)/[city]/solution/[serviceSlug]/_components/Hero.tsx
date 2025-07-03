'use client'

import { Component, Solution, Subservice } from '@/payload-types'
import Image from 'next/image'
import { CITY_PREPOSITIONAL } from '@/app/utils/cities'
import { useCurrentCity } from '@/app/utils/useCurrentCity'

type Props =
  | { component: Component; solution: Solution; subservice?: never }
  | { component: Component; subservice: Subservice; solution?: never }

export default function Hero(props: Props) {
  const [currentCity] = useCurrentCity()
  const cityText = CITY_PREPOSITIONAL[currentCity] || ''

  const { component } = props
  const title = props.solution?.name || props.subservice?.name
  const subtitle = props.solution?.subtitle || props.subservice?.subtitle

  return (
    <section className="container mx-auto py-24 relative">
      <div className="absolute md:hidden -top-20 -left-16 -z-10">
        <Image
          src="/lineSticker.svg"
          alt="sticker line"
          width={500}
          height={500}
          className="object-contain"
          draggable={false}
        />
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex flex-col gap-4 md:max-w-5xl pt-16 px-6 md:p-0">
          <h1 className="text-6xl md:leading-16">
            {title} {cityText && <span>{cityText}</span>}
          </h1>
          <p className="text-lg md:text-2xl font-light">{subtitle}</p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:gap-8 px-6 md:px-12 mt-0 md:mt-20 md:max-w-5xl w-full items-center justify-between">
          {component.statistics?.map((item, i) => (
            <div className="flex flex-col gap-1 md:items-start pt-12" key={i}>
              <h2 className="text-5xl md:text-6xl">{item.text}</h2>
              <p className="text-base font-light">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
