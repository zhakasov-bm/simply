import { Solution } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

export default function SolutionsBlock({ solution }: { solution: Solution }) {
  return (
    <Link
      href={`/solution/${solution.id}`}
      className="w-full bg-teal-500 hover:bg-teal-600font-bold rounded overflow-hidden transition ease-in-out duration-300"
    >
      <div className="bg-lightBG rounded-2xl p-6 flex">
        <div className="flex flex-col gap-2">
          <h3>{solution.slug}</h3>
          <h1 className="text-2xl">{solution.name}</h1>
          <div className="flex flex-wrap w-full gap-2 py-2">
            {solution.details?.map((item, i) => (
              <span key={i} className="px-3 py-1 border border-black/20 rounded-2xl text-sm">
                {item.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          {typeof solution.icon === 'object' && solution.icon.url && (
            <Image
              src={solution.icon.url}
              alt={solution.icon.alt}
              width={200}
              height={200}
              className="contain"
              draggable={false}
            />
          )}
        </div>
      </div>
    </Link>
  )
}
