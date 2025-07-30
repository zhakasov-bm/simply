import Image from 'next/image'
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default function Mission({ page }: { page: Page }) {
  return (
    <section id="mission" className="container-class">
      {(page.layout ?? []).map((block, id) => {
        if (block.blockType === 'mission') {
          return (
            <div key={id} className="flex flex-col gap-8">
              <RichText data={block.title} className="mission-richtext" />
              <div className="grid grid-col-1 md:grid-cols-4 gap-2">
                {block.values?.map((item, id) => (
                  <div
                    key={id}
                    className="rounded-custom flex flex-col gap-6 items-center p-7 bg-background"
                  >
                    <span className="font-inter text-sm uppercase">{item.adv}</span>
                    <div className="relative w-10 h-10">
                      {typeof item.icon === 'object' && item.icon?.url && (
                        <Image
                          src={item.icon.url}
                          alt={item.icon.alt}
                          fill
                          className="object-contain"
                          draggable={false}
                        />
                      )}
                    </div>
                    <p className="text-sm text-center">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
