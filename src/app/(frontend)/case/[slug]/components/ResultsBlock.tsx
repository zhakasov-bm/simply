'use client'

import { Case } from '@/payload-types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function ResultsBlock({ caseData }: { caseData: Case }) {
  const [visibleBlocks, setVisibleBlocks] = useState<number[]>([])
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleBlocks((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index].sort((a, b) => a - b)
              }
              return prev
            })
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    blockRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => observer.disconnect()
  }, [caseData.results])

  return (
    <section id="results" className="bg-background py-1">
      <div className="container-class">
        <h1 className="text-4xl pb-10">{caseData.resultTitle}</h1>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="grid grid-cols-2 gap-2 md:gap-3 md:w-2/3">
            {caseData.results?.map((item, i) => (
              <div
                ref={(el) => {
                  blockRefs.current[i] = el
                }}
                data-index={i}
                className={`flex flex-col gap-3 bg-inputBG justify-between rounded-custom p-4 md:p-6 transition-all duration-700 ease-out ${
                  visibleBlocks.includes(i)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${i * 200}ms`,
                }}
                key={i}
              >
                <span className="text-lg leading-[1.15em] md:text-2xl">{item.value}</span>
                <p className="font-light font-inter text-xs md:text-base">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="md:w-1/3 flex justify-center items-start">
            {caseData['result-image'] &&
              typeof caseData['result-image'] === 'object' &&
              caseData['result-image'].url && (
                <Image
                  src={caseData['result-image'].url}
                  alt={caseData['result-image'].alt || ''}
                  width={200}
                  height={200}
                  className="object-contain max-w-full h-auto"
                  draggable={false}
                />
              )}
          </div>
        </div>
      </div>
    </section>
  )
}
