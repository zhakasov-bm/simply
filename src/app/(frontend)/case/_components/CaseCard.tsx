import { Case } from '@/payload-types'
import Link from 'next/link'

export function CaseCard({ item }: { item: Case }) {
  const imageUrl = typeof item.image === 'string' ? item.image : item.image?.url

  return (
    <Link
      href={`/case/${item.slug}`}
      className="group block w-full lg:min-w-[280px] rounded-2xl overflow-hidden aspect-[4/3] relative flex-shrink-0"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out scale-100 group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <div className="hidden lg:flex gap-2 z-10 absolute bottom-6 left-6">
        {item.tags?.map((t, i) => (
          <span
            key={i}
            className="bg-white/10 backdrop-blur-[3px] px-3 py-1 rounded-full text-sm font-light border border-white/40 text-white"
          >
            {t.tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
