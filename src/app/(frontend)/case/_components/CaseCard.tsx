import { Case } from '@/payload-types'
import Link from 'next/link'

export function CaseCard({ item }: { item: Case }) {
  const imageUrl = typeof item.image === 'string' ? item.image : item.image?.url

  return (
    <Link
      href={`/case/${item.slug}`}
      className="block w-full min-w-[280px] rounded-2xl overflow-hidden aspect-[4/3] bg-cover bg-center group flex-shrink-0"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="flex gap-2 ml-6 pt-18 z-10 relative">
        {item.tags?.map((t, i) => (
          <span
            key={i}
            className="bg-white/20 px-3 py-1 rounded-full text-sm font-light border border-white/40 text-white"
          >
            {t.tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
