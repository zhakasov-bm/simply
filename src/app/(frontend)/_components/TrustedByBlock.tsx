import { Component } from '@/payload-types'
import Image from 'next/image'

export default function TrustedByBlock({ component }: { component: Component }) {
  return (
    <section className="hidden md:container mx-auto py-20 px-16">
      {component.globals.map((block, id) => {
        if (block.blockType === 'trusted-by') {
          return (
            <div key={id} className="flex flex-col gap-12">
              <h1 className="text-xl text-center font">{block.heading}</h1>
              <div className="flex justify-between gap-24">
                {block.logos?.map((item, i) => (
                  <div key={i} className="w-full h-10 relative">
                    {typeof item.logo === 'object' && item.logo.url && (
                      <Image
                        src={item.logo.url}
                        alt={item.logo.alt}
                        fill
                        className="object-contain"
                        draggable={false}
                      />
                    )}
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
