import { Page } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default function Hero({ page }: { page: Page }) {
  return (
    <section className="container mx-auto pt-24 relative">
      {page.layout.map((block, id) => {
        if (block.blockType === 'company') {
          return (
            <div key={id} className="flex flex-col items-center">
              <RichText data={page.heading} />
              <div className="relative w-4/6 aspect-video">
                {typeof page.image === 'object' && page.image?.url && (
                  <Image
                    src={page.image.url}
                    alt={page.image.alt}
                    fill
                    className="object-contain"
                    draggable={false}
                  />
                )}
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
