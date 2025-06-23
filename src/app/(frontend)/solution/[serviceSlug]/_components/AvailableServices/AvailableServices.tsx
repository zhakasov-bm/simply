import UniversalButton from '@/app/(frontend)/_components/UniversalButton'
import { ServiceCard } from './cards/ServiceCard'
import { SubserviceCard } from './cards/SubserviceCard'
import { AvailableServicesProps } from './types'

export default function AvailableServices({
  solution,
  subservices,
  subservice,
}: AvailableServicesProps) {
  const renderServices = () => {
    if (subservice) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
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
            <ServiceCard key={id} name={service.title || ''} icon={null} />
          ))}
        {subservices.map((sub, idx) => (
          <SubserviceCard key={idx} sub={sub} solutionSlug={solution.slug || ''} />
        ))}
      </div>
    )
  }

  return (
    <section className="container-class flex flex-col items-center">
      <h1 className="text-4xl pb-12">
        {subservice ? subservice.serviceTitle : solution.servicesTitle}
      </h1>
      {renderServices()}
      <UniversalButton label="Получить консультацию" className="mt-12" />
    </section>
  )
}
