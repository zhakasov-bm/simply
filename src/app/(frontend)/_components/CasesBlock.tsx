'use client'

import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import UniversalButton from './UniversalButton'
import { Case } from '@/payload-types'
import { CaseCard } from '../case/_components/CaseCard'

type Props = {
  heading: string
  cases: Case[]
  type?: 'slider' | 'simple'
  excludeId?: string
}

export default function CasesBlock({ heading, cases, type = 'simple', excludeId }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const filteredCases = cases
    .filter((c) => c.id !== excludeId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

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

  return (
    <section
      id="cases"
      className="container-class my-20"
      style={{
        backgroundImage: 'url("/graphic.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
      }}
    >
      <h1 className="text-4xl text-center mb-8 md:mb-12">{heading}</h1>

      {type === 'slider' && !isMobile && (
        <>
          <div ref={sliderRef} className="keen-slider">
            {groupedCases.map((group, i) => (
              <div className="keen-slider__slide px-4 min-w-full sm:min-w-0" key={i}>
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
        </>
      )}

      {(type === 'simple' || isMobile) && (
        <div
          className={`${
            isMobile
              ? 'flex gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar px-2'
              : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4'
          }`}
        >
          {(type === 'simple' && !isMobile ? filteredCases.slice(0, 3) : filteredCases).map(
            (item) => (
              <div key={item.id} className={isMobile ? 'flex-shrink-0 min-w-[280px]' : ''}>
                <CaseCard item={item} />
              </div>
            ),
          )}
        </div>
      )}

      <div className="flex justify-center pt-10">
        <UniversalButton label="Смотреть все кейсы" to="/case" />
      </div>
    </section>
  )
}
