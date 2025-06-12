'use client'

import { useState, useRef, useEffect } from 'react'
import { Solution } from '@/payload-types'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { RichText } from '@payloadcms/richtext-lexical/react'
import UniversalButton from '@/app/(frontend)/_components/UniversalButton'

export default function QABlock({ solution }: { solution: Solution }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="container mx-auto py-20">
      <h1 className="text-4xl pb-12 text-center">{solution.titleQA}</h1>
      <div className="flex flex-col gap-4">
        {solution.questions?.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <div key={index} className="bg-lightBG rounded-2xl p-6 transition-all duration-300">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(index)}
              >
                <h2 className="text-lg font-medium">{item.question}</h2>
                {isOpen ? <FaMinus /> : <FaPlus />}
              </div>

              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  isOpen ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-700">{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="bg-greenBG rounded-2xl items-center text-center py-12 px-40 mt-20">
        <RichText data={solution.Lead} />
      </div>
      <UniversalButton label="Заказать" className="my-6 w-full" />
    </section>
  )
}
