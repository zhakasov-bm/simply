import { Solution } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import Image from 'next/image'

export default async function SolutionPage({ params }: { params: { solutionId: string } }) {
  const { solutionId } = await params

  const payload = await getPayload({ config: configPromise })

  let solution: Solution | null = null

  try {
    const res = await payload.findByID({
      collection: 'solutions',
      id: solutionId,
    })

    solution = res
  } catch (err) {
    console.error(err)
    return notFound()
  }

  if (!solution) {
    return notFound()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 cursor-pointer">
      <div className="bg-lightBG rounded-2xl p-6 flex">
        <div className="flex flex-col gap-2">
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
    </div>
  )
}
