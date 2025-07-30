'use client'

import { useState } from 'react'
import { Solution, Subservice } from '@/payload-types'
import { FaPlus, FaMinus } from 'react-icons/fa'

type Props = {
  solution?: Solution
  subservice?: Subservice
}

export default function QABlock({ solution, subservice }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const content = solution || subservice
  if (!content) return null

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="container mx-auto px-8 md:px-40">
      <h1 className="text-4xl pb-8 md:pb-12 text-center">{content.titleQA}</h1>
      <div className="flex flex-col gap-3">
        {content.questions?.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <div
              key={index}
              className="bg-background rounded-custom p-6 transition-all duration-500"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(index)}
              >
                <span className="text-base">{item.question}</span>
                {isOpen ? <FaMinus /> : <FaPlus />}
              </div>

              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  isOpen ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="text-link/70 font-inter pt-4">{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
