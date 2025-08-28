'use client'

import UniversalButton from '@/app/(frontend)/_components/UniversalButton'
import { ServiceCard } from './cards/ServiceCard'
import { SubserviceCard } from './cards/SubserviceCard'
import { AvailableServicesProps } from './types'
import { usePathname } from 'next/navigation'
import { useCurrentCity } from '@/app/utils/useCurrentCity'
import { ConsultationForm } from '@/app/(frontend)/_components/Modal/ConsultationModal'
import { useState } from 'react'

export default function AvailableServices({
  solution,
  subservices,
  subservice,
}: AvailableServicesProps) {
  const pathname = usePathname()
  const [currentCity] = useCurrentCity()
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalSubmit = (data: { name: string; email: string; phone: string }) => {
    setModalOpen(false)
    // Optionally show a success message
  }

  const renderServices = () => {
    if (subservice) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 w-full">
          {subservice.services?.map((service, id) => (
            <ServiceCard
              key={id}
              name={service.name || ''}
              icon={
                typeof service.icon === 'object' && service.icon?.url
                  ? {
                      url: service.icon.url,
                      alt: service.icon.alt || undefined,
                    }
                  : null
              }
            />
          ))}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {!solution.hasSubservices &&
          solution.availableServices?.map((service, id) => (
            <ServiceCard
              key={id}
              name={service.title || ''}
              icon={
                typeof service.icon === 'object' && service.icon?.url
                  ? {
                      url: service.icon.url,
                      alt: service.icon.alt || undefined,
                    }
                  : {
                      url: '/simply-sticker.svg',
                    }
              }
            />
          ))}
        {subservices.map((sub, idx) => (
          <SubserviceCard
            key={idx}
            sub={sub}
            solutionSlug={solution.slug || ''}
            currentCity={currentCity}
          />
        ))}
      </div>
    )
  }

  return (
    <section id="services" className="container-class py-8 flex flex-col items-center">
      <h1 className="text-4xl pb-6 md:pb-12 text-center">
        {subservice ? subservice.serviceTitle : solution.servicesTitle}
      </h1>
      {renderServices()}
      <UniversalButton
        label="Получить консультацию"
        className="mt-8 md:mt-12"
        onClick={() => setModalOpen(true)}
      />
      <ConsultationForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </section>
  )
}
