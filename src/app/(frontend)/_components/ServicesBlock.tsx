'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Solution } from '@/payload-types'

type Props = {
  heading: string
  solutions: Solution[]
}

export default function ServicesBlock({ heading, solutions }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  //Details for unique block
  const details = ['Бренд', 'Сопровождение', 'Мерч']

  const categoryLabels: Record<string, string> = {
    content: 'Креатив и Контент',
    pr: 'Продвижение и PR',
    brand: 'Стратегия и Бренд',
    website: 'Сайты и Технологии',
  }

  // Категория тізімі — автоматты түрде unique мәндерді жинаймыз
  const categories = Array.from(new Set(solutions.map((s) => s.category)))

  // Фильтрленген нәтижелер
  const filteredSolutions =
    selectedCategory === 'all'
      ? solutions
      : solutions.filter((s) => s.category === selectedCategory)

  return (
    <section className="container mx-auto my-20">
      <h1 className="text-4xl text-center mb-12">{heading}</h1>

      {/* Category Select */}
      <div className="flex mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex-1 py-2 font-light border-b transition text-center ${
            selectedCategory === 'all' ? ' font-normal border-black' : 'font-light border-gray-300'
          }`}
        >
          Все услуги
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-1 py-2 font-light border-b transition text-center ${
              selectedCategory === cat ? ' font-normal border-black' : 'font-light border-gray-300'
            }`}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredSolutions.map((solution) => (
          <Link
            href={`/solution/${solution.id}`}
            key={solution.id}
            className="w-full bg-lightBG rounded-2xl p-6 flex justify-between items-start group"
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">{solution.name}</h1>
              <div className="flex flex-wrap w-full gap-2 pt-2 pb-10">
                {solution.details?.map((item, i) => (
                  <span key={i} className="px-3 py-1 border border-black/20 rounded-2xl text-sm">
                    {item.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Consistent image size container */}
            <div className="w-[200px] h-[200px] relative overflow-hidden">
              {typeof solution.icon === 'object' && solution.icon.url && (
                <Image
                  src={solution.icon.url}
                  alt={solution.icon.alt || ''}
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
          className="bg-primary rounded-2xl flex justify-between mt-5 cursor-pointer"
          style={{
            backgroundImage: 'url("/bg-line.svg")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
            backgroundSize: 'contain',
          }}
        >
          <div className="flex flex-col gap-2 p-10">
            <h1 className="text-2xl">Обслуживание брендов под ключ</h1>
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
