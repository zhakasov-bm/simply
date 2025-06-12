import { Component } from '@/payload-types'
import Image from 'next/image'

export default function WhyUsBlock({ component }: { component: Component }) {
  return (
    <section className="container mx-auto py-20">
      {component.globals?.map((block, id) => {
        if (block.blockType === 'why-us') {
          return (
            <div key={id}>
              <h1 className="text-4xl text-center pb-12">{block.heading}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {block.items?.map((item, id) => (
                  <div key={id} className="bg-lightBG rounded-2xl p-10 relative">
                    <div className="flex flex-col gap-4 pb-10 pr-50">
                      <h1 className="text-2xl">{item.title}</h1>
                      <p className="text-base font-light text-black/60 font-inter">
                        {item.description}
                      </p>
                    </div>
                    <div className="absolute right-5 bottom-5">
                      {typeof item.icon === 'object' && item.icon.url && (
                        <Image
                          src={item.icon.url}
                          alt={item.icon.alt}
                          width={200}
                          height={200}
                          className="contain"
                          draggable={false}
                        />
                      )}
                    </div>
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
