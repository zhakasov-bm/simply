'use client'

import UniversalButton from '@/app/(frontend)/_components/UniversalButton'
import { Vacancy } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useState } from 'react'
import { FaChevronRight, FaChevronUp } from 'react-icons/fa'
import Image from 'next/image'
import { ConsultationForm } from '@/app/(frontend)/_components/Modal/ConsultationModal'
import VacancyModal from '@/app/(frontend)/_components/Modal/VacancyModal'

function formatDate(timestamp: string | number | Date): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function VacancyCard({ item }: { item: Vacancy }) {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent toggle when clicking inside the details
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If click is inside the details, do nothing
    if ((e.target as HTMLElement).closest('.vacancy-details')) return
    setIsOpen((prev) => !prev)
  }

  const [modalOpen, setModalOpen] = useState(false)
  const handleModalSubmit = (data: { name: string; email: string; phone: string }) => {
    setModalOpen(false)
  }

  return (
    <div
      className="p-6 md:p-8 bg-background rounded-custom space-y-4 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl">{item.title}</h3>
          <span className="text-black bg-primary rounded-full px-3 py-1 text-sm">{item.city}</span>
        </div>
        <p className="font-inter text-base text-muted-foreground line-clamp-2 md:line-clamp-none">
          {item.subtitle}
        </p>
      </div>

      {/* Schedule and Salary */}
      <div className="flex flex-wrap gap-5 md:pr-50">
        {item.tags?.map((tag, i) => (
          <div key={i} className="flex gap-2">
            <div className="w-6 h-6 relative">
              {typeof tag.icon === 'object' && tag.icon.url && (
                <Image
                  src={tag.icon.url}
                  alt={tag.icon.alt || 'tags'}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <span className="font-inter text-link">{tag.name}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between py-2">
        <time className="text-link/40 font-inter text-sm font-light">
          {formatDate(item.createdAt)}
        </time>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen((prev) => !prev)
          }}
          className="text-hoverText cursor-pointer"
        >
          {isOpen ? <FaChevronUp /> : <FaChevronRight />}
        </button>
      </div>

      {/* Hidden Details */}
      {isOpen && (
        <div className="mt-4 space-y-4 animate-fade-in vacancy-details">
          <div className="font-inter mb-8">
            <RichText data={item.description} />
          </div>
          <VacancyModal buttonTitle={item.button || 'Откликнуться'} vacancyName={item.title} />
        </div>
      )}
    </div>
  )
}
