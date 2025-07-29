import { Component } from '@/payload-types'
import Image from 'next/image'

export default function WhyUsBlock({ component }: { component: Component }) {
  return (
    <section className="container-class">
      {component.globals?.map((block, id) => {
        if (block.blockType === 'why-us') {
          return (
            <div key={id}>
              <h1 className="text-4xl text-center pb-6 md:pb-12">{block.heading}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {block.items?.map((item, id) => (
                  <div
                    key={id}
                    className="bg-background rounded-custom p-5 md:p-10 overflow-hidden relative"
                  >
                    <div className="flex flex-col gap-8 md:gap-4 pr-20 md:pb-10 md:pr-50">
                      <span className="text-lg leading-6 md:text-xl">{item.title}</span>
                      <p className="text-xs md:text-base text-link/60 font-inter">
                        {item.description}
                      </p>
                    </div>
                    <div className="absolute -right-24 -bottom-8 -rotate-12 md:rotate-none md:right-5 md:bottom-5">
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
