'use client'

import { useState } from 'react'
import { Page } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type ServicesProps = Extract<Page['layout'][0], { blockType: 'solutions' }>

export default function ServicesBlock({ block }: { block: ServicesProps }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  //Details for unique block
  const details = ['Бренд', 'Сопровождение', 'Мерч']

  // Уникальные категории
  // const categories = Array.from(
  //   new Set(block.?.map((service) => service.category))
  // );

  // // Фильтрация по категории
  // const filteredServices =
  //   selectedCategory === "all"
  //     ? block.service
  //     : block.service?.filter(
  //         (service) => service.category === selectedCategory
  //       );

  return (
    <section className="container mx-auto my-20">
      <h1 className="text-4xl pb-12 text-center">{block.heading}</h1>

      {/* Select категория */}
      <div className="flex justify-center mb-10">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="all">Все</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Услуги */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 cursor-pointer">
        {filteredServices?.map((service, i) => (
          <div key={i} className="bg-lightBG rounded-2xl p-6 flex">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">{service.name}</h1>
              <div className="flex flex-wrap w-full gap-2 py-2">
                {service.details?.map((item, i) => (
                  <span key={i} className="px-3 py-1 border border-black/20 rounded-2xl text-sm">
                    {item.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {typeof service.icon === 'object' && service.icon.url && (
                <Image
                  src={service.icon.url}
                  alt={service.icon.alt}
                  width={200}
                  height={200}
                  className="contain"
                  draggable={false}
                />
              )}
            </div>
          </div>
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
