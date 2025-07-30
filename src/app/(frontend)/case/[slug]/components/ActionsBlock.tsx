'use client'

import { Case } from '@/payload-types'
import { useEffect, useRef, useState } from 'react'

export default function ActionsBlock({ caseData }: { caseData: Case }) {
  const [visibleBlockIndex, setVisibleBlockIndex] = useState<number>(-1)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleBlockIndex(index)
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px',
      },
    )

    blockRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => observer.disconnect()
  }, [caseData.actions])

  return (
    <section
      id="actions"
      className="container-class"
      style={{
        backgroundImage: 'url("/graphic.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
      }}
    >
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col gap-4 md:w-1/3">
          <h1 className="text-5xl">{caseData.actionTitle}</h1>
        </div>
        <div className="md:w-2/3">
          {/* Stack container */}
          <div className="relative">
            {caseData.actions?.map((item, i) => (
              <div
                ref={(el) => {
                  blockRefs.current[i] = el
                }}
                data-index={i}
                className={`flex flex-col gap-2 bg-background justify-between rounded-custom p-4 md:p-6 transition-all duration-700 ease-out mb-2 ${
                  visibleBlockIndex >= i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transform:
                    visibleBlockIndex >= i
                      ? `translateY(${(visibleBlockIndex - i) * -8}px)`
                      : 'translateY(12px)',
                  zIndex: visibleBlockIndex >= i ? (caseData.actions?.length || 0) - i : 0,
                }}
                key={i}
              >
                <h3 className="text-lg">{item.title}</h3>
                <p className="font-light font-inter text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
