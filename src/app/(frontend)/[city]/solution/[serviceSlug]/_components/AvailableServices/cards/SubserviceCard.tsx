import { Subservice } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type SubserviceCardProps = {
  sub: Subservice
  solutionSlug: string
  currentCity: string
}

export const SubserviceCard = ({ sub, solutionSlug, currentCity }: SubserviceCardProps) => (
  <Link
    href={`/${currentCity}/solution/${solutionSlug}/${sub.slug}`}
    className="flex p-6 md:p-10 rounded-custom bg-background relative overflow-hidden group w-full"
  >
    <div className="absolute top-8 right-8  md:hidden">
      <Image src={'/nav.svg'} alt="arrow" width={24} height={24} />
    </div>
    <div className="flex flex-col gap-10 justify-between z-10 h-[120px] md:h-[180px]">
      <span className="text-xl md:text-2xl">{sub.name}</span>
      <p className="font-inter font-light line-clamp-2 md:line-clamp-3 pr-12 md:pr-40">
        {sub.description}
      </p>
    </div>

    {typeof sub.icon === 'object' && sub.icon?.url && (
      <div className="absolute -bottom-16 -right-16 rotate-[-11deg] w-40 h-40 md:w-60 md:h-60">
        <Image
          src={sub.icon.url}
          alt={sub.icon.alt || ''}
          fill
          className="object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-120"
          draggable={false}
        />
      </div>
    )}
  </Link>
)
