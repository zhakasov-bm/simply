import { Subservice } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type SubserviceCardProps = {
  sub: Subservice
  solutionSlug: string
}

export const SubserviceCard = ({ sub, solutionSlug }: SubserviceCardProps) => (
  <Link
    href={`/solution/${solutionSlug}/${sub.slug}`}
    className="flex p-10 pr-48 rounded-custom bg-lightBG relative overflow-hidden group w-full"
  >
    <div className="flex flex-col gap-2 z-10">
      <h1 className="text-2xl">{sub.name}</h1>
      <p className="font-inter font-light line-clamp-4">{sub.description}</p>
    </div>

    {typeof sub.icon === 'object' && sub.icon?.url && (
      <div className="absolute -bottom-16 -right-16 rotate-[-11deg]">
        <Image
          src={sub.icon.url}
          alt={sub.icon.alt || ''}
          width={240}
          height={240}
          className="pointer-events-none select-none transition-transform duration-300 group-hover:scale-105"
          draggable={false}
        />
      </div>
    )}
  </Link>
)
