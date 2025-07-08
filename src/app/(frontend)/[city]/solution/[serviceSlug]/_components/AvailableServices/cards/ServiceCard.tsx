import Image from 'next/image'
import { ServiceItem } from '../types'

export const ServiceCard = ({ name, icon }: ServiceItem) => (
  <div className="bg-background p-4 md:px-6 flex gap-4 items-center rounded-custom">
    {icon?.url ? (
      <Image
        src={icon.url}
        alt={icon.alt || ''}
        width={56}
        height={56}
        className="contain"
        draggable={false}
      />
    ) : (
      <Image
        src="/simply-sticker.svg"
        alt="service-icon"
        width={56}
        height={56}
        className="contain"
        draggable={false}
      />
    )}
    <p className="text-sm md:text-base">{name}</p>
  </div>
)
