'use client'

import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import UniversalButton from './UniversalButton'
import { Case } from '@/payload-types'
import { CaseCard } from '../case/_components/CaseCard'

type Props = {
  heading: string
  cases: Case[]
  type?: 'slider' | 'simple' | 'loadMore'
  excludeId?: string
}

export default function CasesBlock({ heading, cases, type = 'slider', excludeId }: Props) {
  const filteredCases = cases
    .filter((c) => c.id !== excludeId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  const groupedCases = Array.from({ length: Math.ceil(filteredCases.length / 6) }, (_, i) =>
    filteredCases.slice(i * 6, i * 6 + 6),
  )

  const [visibleCount, setVisibleCount] = useState(6)
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  return (
    <section
      className="container mx-auto my-20 px-16"
      style={{
        backgroundImage: 'url("graphic.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
      }}
    >
      <h1 className="text-4xl text-center mb-12">{heading}</h1>

      {/* Slider Type */}
      {type === 'slider' && (
        <>
          <div ref={sliderRef} className="keen-slider">
            {groupedCases.map((group, i) => (
              <div className="keen-slider__slide px-4" key={i}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {group.map((item) => (
                    <CaseCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {groupedCases.map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-2 h-2 rounded-custom cursor-pointer transition ${
                  currentSlide === idx ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center pt-10">
            <UniversalButton label="Смотреть все кейсы" to="/case" />
          </div>
        </>
      )}

      {/* Simple Type */}
      {type === 'simple' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
            {filteredCases.slice(0, 3).map((item) => (
              <CaseCard key={item.id} item={item} />
            ))}
          </div>
          <div className="flex justify-center pt-10">
            <UniversalButton label="Смотреть все кейсы" to="/case" />
          </div>
        </>
      )}

      {/* Load More Type */}
      {type === 'loadMore' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
            {filteredCases.slice(0, visibleCount).map((item) => (
              <CaseCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            Показано {Math.min(visibleCount, filteredCases.length)} из {filteredCases.length}
          </div>

          {visibleCount < filteredCases.length ? (
            <div className="flex justify-center pt-10">
              <UniversalButton label="Показать ещё" onClick={handleLoadMore} />
            </div>
          ) : null}
        </>
      )}
    </section>
  )
}
