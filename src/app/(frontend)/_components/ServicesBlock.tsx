'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCurrentCity } from '@/app/utils/useCurrentCity'

import { Solution } from '@/payload-types'
import UniversalButton from './UniversalButton'
import { ConsultationForm } from './Modal/ConsultationModal'
import Breadcrumbs from './Breadcrumbs/Breadcrumbs'

type Props = {
  heading: string
  solutions: Solution[]
}

export default function ServicesBlock({ heading, solutions }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentCity] = useCurrentCity()
  const [modalOpen, setModalOpen] = useState(false)

  // Filter out maintenance services from main list
  const regularSolutions = solutions.filter((solution) => !solution.maintenance)
  const maintenanceSolutions = solutions.filter((solution) => solution.maintenance)

  const categoryLabels: Record<string, string> = {
    content: 'Креатив и Контент',
    pr: 'Продвижение и PR',
    brand: 'Стратегия и Бренд',
    website: 'Сайты и Технологии',
  }

  const categories = Array.from(
    new Set(regularSolutions.map((s) => s.category).filter((cat) => cat != null)),
  ) as string[]

  const filteredSolutions =
    selectedCategory === 'all'
      ? regularSolutions
      : regularSolutions.filter((s) => s.category === selectedCategory)

  const handleModalSubmit = (data: { name: string; email: string; phone: string }) => {
    // TODO: handle form submission (e.g., send to API)
    setModalOpen(false)
    // Optionally show a success message
  }

  return (
    <section className="container-class" id="services">
      {/* <div className="mb-8 px-6 md:px-0 flex justify-center">
        <Breadcrumbs />
      </div> */}
      <h1 className="text-4xl text-center mb-8 md:mb-12">{heading}</h1>

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
            selectedCategory === 'all' ? 'font-normal border-link' : 'font-light border-cityHover'
          }`}
        >
          Все услуги
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-1 py-2 font-light border-b text-center transition-colors duration-300 ease-in-out cursor-pointer ${
              selectedCategory === cat ? 'font-normal border-link' : 'font-light border-cityHover'
            }`}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="flex overflow-x-auto hide-scrollbar md:grid grid-cols-2 gap-3 h-[280px] md:h-auto">
        {filteredSolutions.map((solution) => (
          <Link
            href={`/${currentCity}/solution/${solution.slug}`}
            key={solution.id}
            className="relative bg-background rounded-custom p-6 flex flex-col md:flex-row justify-between items-start group md:max-h-[240px] min-w-[80%] overflow-hidden"
          >
            <div className="flex flex-col gap-2 z-10 md:pb-16 md:max-w-90">
              <h3 className="text-base md:text-xl">{solution.name}</h3>
              <div className="flex flex-wrap w-full gap-1 md:gap-2 pt-2 pb-10">
                {solution.details?.map((item, i) => (
                  <span
                    key={i}
                    className="px-2 md:px-3 py-1 border border-link/20 bg-background/20 backdrop-blur-[2px] rounded-custom text-[10px] md:text-sm"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Image */}
            {typeof solution.icon === 'object' && solution.icon?.url && (
              <div className="absolute bottom-[-20px] -right-10 w-[200px] h-[200px] md:bottom-[-70px] md:right-[-40px] md:w-[280px] md:h-[280px] pointer-events-none">
                <Image
                  src={solution.icon?.url}
                  alt={solution.icon?.alt || ''}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                />
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Maintenance Services Section */}
      {maintenanceSolutions.length > 0 && (
        <div className="mt-5 space-y-3">
          {maintenanceSolutions.map((solution) => (
            <Link href={`/${currentCity}/solution/${solution.slug}`} key={solution.id}>
              <div
                className="relative bg-primary rounded-custom flex justify-between cursor-pointer overflow-hidden h-[280px]"
                style={{
                  backgroundImage: 'url("/bg-line.svg")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'bottom right',
                  backgroundSize: 'contain',
                }}
              >
                <div className="flex flex-col gap-2 p-6 md:p-10 text-black">
                  <h3 className="text-xl">{solution.name}</h3>
                  <div className="flex flex-wrap w-full gap-2 py-2 z-100">
                    {solution.details?.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 md:px-3 py-1 border border-black/20 bg-white/10 backdrop-blur-[2px] rounded-custom text-[10px] md:text-sm"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
                {typeof solution.icon === 'object' && solution.icon?.url && (
                  <div className="absolute -bottom-32 md:-bottom-20 right-0 md:right-20 -rotate-40">
                    <Image
                      src={solution.icon.url}
                      alt={solution.icon.alt || ''}
                      width={400}
                      height={400}
                      className="contain"
                      draggable={false}
                    />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="flex justify-center pt-10">
        <UniversalButton label="Получить консультацию" onClick={() => setModalOpen(true)} />
      </div>
      <ConsultationForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </section>
  )
}
