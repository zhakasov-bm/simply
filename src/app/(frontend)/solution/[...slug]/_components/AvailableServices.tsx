import { Component } from '@/payload-types'
import Image from 'next/image'

export default function AvailableServices({ component }: { component: Component }) {
  return (
    <section className="container mx-auto py-20">
      {component.globals?.map((block, id) => {
        if (block.blockType === 'available-services') {
          return (
            <div key={id}>
              <h1 className="text-4xl text-center pb-12">{block.heading}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {block.services?.map((item, id) => (
                  <div
                    key={id}
                    className="flex flex-row-reverse gap-4 bg-lightBG rounded-2xl px-8 py-6 items-cente justify-start"
                  >
                    <h1 className="text-lg">{item.title}</h1>
                    {typeof item.icon === 'object' && item.icon.url && (
                      <Image
                        src={item.icon.url}
                        alt={item.icon.alt}
                        width={50}
                        height={50}
                        className="contain"
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
