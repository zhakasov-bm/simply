'use client'

import UniversalButton from '@/app/(frontend)/_components/UniversalButton'
import { Vacancy } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useState } from 'react'
import { FaChevronRight, FaChevronUp } from 'react-icons/fa'

export default function VacancyCard({ item }: { item: Vacancy }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-8 bg-background rounded-custom space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl">{item.title}</h3>
          <span className="text-black bg-primary rounded-full px-3 py-1 text-sm">{item.city}</span>
        </div>
        <p className="font-inter text-base text-muted-foreground">{item.subtitle}</p>
      </div>

      {/* Schedule and Salary */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-sm text-gray-600">
          <p>{item.schedule}</p>
          <p>{item.salary}</p>
        </div>
        <button onClick={() => setIsOpen((prev) => !prev)} className="text-primary">
          {isOpen ? <FaChevronUp /> : <FaChevronRight />}
        </button>
      </div>

      {/* Hidden Details */}
      {isOpen && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <div className="font-inter">
            <RichText data={item.description} />
          </div>
          <UniversalButton label={item.button || 'Откликнуться'} />
        </div>
      )}
    </div>
  )
}
