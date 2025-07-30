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
      id="info"
      className="container-class md:py-20"
      style={{
        backgroundImage: 'url("/graphic.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
      }}
    >
      <h1 className="text-3xl md:text-4xl pb-12 text-center">{content.heading || content.name}</h1>
      <div className="bg-background rounded-custom p-8 md:px-16 md:py-10 flex flex-col-reverse md:flex-row items-center gap-2 md:gap-24">
        <div className="flex flex-col gap-4 md:gap-6">
          <span className="text-xl md:text-3xl">{content.title || content.name}</span>
          <p className="font-inter font-normal text-lg md:text-xl text-link/60">
            {content.description || content.subtitle}
          </p>
        </div>
        <div className="w-[70%] md:w-full md:h-full">
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
