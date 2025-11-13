import { Page } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Breadcrumbs from '../../_components/Breadcrumbs/Breadcrumbs'

export default function Hero({ page }: { page: Page }) {
  return (
    <section className="container mx-auto pt-8 relative">
      {Array.isArray(page.layout) &&
        page.layout.map((block, id) => {
          if (block.blockType === 'company') {
            return (
              <div key={id} className="flex flex-col items-center">
                {/* Breadcrumbs */}
                <div className="mb-8 px-6 md:px-0 flex justify-center">
                  <Breadcrumbs
                    customLabels={{ company: typeof page.name === 'string' ? page.name : 'О нас' }}
                  />
                </div>
                {page.heading ? <RichText data={page.heading} /> : null}
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
