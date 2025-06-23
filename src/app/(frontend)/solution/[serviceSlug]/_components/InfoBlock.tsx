import { Solution, Subservice } from '@/payload-types'
import Image from 'next/image'

type Props = {
  solution?: Solution
  subservice?: Subservice
}

export default function InfoBlock({ solution, subservice }: Props) {
  const content = solution || subservice

  if (!content) return null

  return (
    <section
      className="container-class py-20"
      style={{
        backgroundImage: 'url("/graphic.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
      }}
    >
      <h1 className="text-3xl md:text-4xl pb-12 text-center">{content.heading || content.name}</h1>
      <div className="bg-lightBG rounded-custom px-16 py-10 flex items-center gap-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl md:text-3xl">{content.title || content.name}</h1>
          <p className="font-inter font-normal text-xl text-black/60">
            {content.description || content.subtitle}
          </p>
        </div>
        <div className="h-full">
          {typeof content.icon === 'object' && content.icon?.url && (
            <Image
              src={content.icon.url}
              alt={content.icon.alt || ''}
              width={1000}
              height={1000}
              className="contain"
              draggable={false}
            />
          )}
        </div>
      </div>
    </section>
  )
}
