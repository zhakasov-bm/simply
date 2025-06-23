'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'

import { Solution } from '@/payload-types'

type Props = {
  heading: string
  solutions: Solution[]
}

export default function ServicesBlock({ heading, solutions }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.2,
      spacing: 12,
    },
    breakpoints: {
      '(min-width: 768px)': {
        disabled: true,
      },
    },
  })
  //Details for unique block
  const details = ['Бренд', 'Сопровождение', 'Мерч']

  const categoryLabels: Record<string, string> = {
    content: 'Креатив и Контент',
    pr: 'Продвижение и PR',
    brand: 'Стратегия и Бренд',
    website: 'Сайты и Технологии',
  }

  const categories = Array.from(new Set(solutions.map((s) => s.category)))

  const filteredSolutions =
    selectedCategory === 'all'
      ? solutions
      : solutions.filter((s) => s.category === selectedCategory)

  return (
    <section className="container-class my-20">
      <h1 className="text-4xl text-center mb-12">{heading}</h1>

      {/* Mobile Select */}
      <div className="block sm:hidden mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="all">Все услуги</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {categoryLabels[cat] || cat}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex flex-wrap sm:flex-nowrap sm:flex-row mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex-1 py-2 font-light border-b text-center transition-colors duration-300 ease-in-out cursor-pointer ${
            selectedCategory === 'all' ? 'font-normal border-black' : 'font-light border-gray-300'
          }`}
        >
          Все услуги
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-1 py-2 font-light border-b text-center transition-colors duration-300 ease-in-out cursor-pointer ${
              selectedCategory === cat ? 'font-normal border-black' : 'font-light border-gray-300'
            }`}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      <div ref={sliderRef} className="keen-slider md:grid grid-cols-2 gap-3">
        {filteredSolutions.map((solution) => (
          <Link
            href={`/solution/${solution.slug}`}
            key={solution.id}
            className="keen-slider__slide bg-lightBG rounded-custom p-6 flex flex-col md:flex-row justify-between items-start group min-w-[80%]"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-xl">{solution.name}</h3>
              <div className="flex flex-wrap w-full gap-2 pt-2 pb-10">
                {solution.details?.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 border border-black/20 rounded-custom text-xs md:text-sm"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Consistent image size container */}
            <div className="w-[200px] h-full relative overflow-hidden">
              {typeof solution.icon === 'object' && solution.icon?.url && (
                <Image
                  src={solution.icon?.url}
                  alt={solution.icon?.alt || ''}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                />
              )}
            </div>
          </Link>
        ))}
      </div>

      <Link href="/solution">
        <div
          className="bg-primary rounded-custom flex justify-between mt-5 cursor-pointer"
          style={{
            backgroundImage: 'url("/bg-line.svg")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
            backgroundSize: 'contain',
          }}
        >
          <div className="flex flex-col gap-2 p-10">
            <h3 className="text-xl">Обслуживание брендов под ключ</h3>
            <div className="flex flex-wrap w-full gap-2 py-2">
              {details?.map((item, i) => (
                <span key={i} className="px-3 py-1 border border-black/20 rounded-2xl text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-10 align-bottom">
            <Image
              src="/service.svg"
              alt="/group-people"
              width={500}
              height={500}
              className="contain"
              draggable={false}
            />
          </div>
        </div>
      </Link>
    </section>
  )
}
