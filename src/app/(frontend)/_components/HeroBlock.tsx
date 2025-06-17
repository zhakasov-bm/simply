import Image from 'next/image'
import { Component } from '@/payload-types'
import UniversalButton from './UniversalButton'

export default function HeroBlock({ component }: { component: Component }) {
  return (
    <section className=" py-24">
      {component.globals.map((block, id) => {
        if (block.blockType === 'hero') {
          return (
            <div key={id} className="flex gap-4 container mx-auto">
              <div className="flex flex-col gap-8 flex-8/12">
                <h1 className="lg:text-[64px] font-medium leading-tight">{block.heading}</h1>

                <div
                  className="h-full px-9 pb-15 flex flex-col gap-4 justify-end overflow-hidden relative rounded-2xl"
                  style={{
                    backgroundImage: 'url("/bg-hero.svg")',
                    width: '100%',
                    height: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                >
                  <div className="absolute flex top-2 left-0">
                    <Image src="/btn.svg" alt="btn_graphic" width={60} height={60} />
                    <UniversalButton label="Погрузиться в креатив" className="w-[360px]" />
                  </div>
                  <Image
                    src="/graphic.png"
                    alt="graphic"
                    width={500}
                    height={500}
                    className="absolute top-[-100px] right-[-80px] w-[300px]"
                    draggable={false}
                  />
                  <Image
                    src="/star.svg"
                    alt="star"
                    width={500}
                    height={500}
                    className="transform scale-x-[-1] max-w-fit"
                    draggable={false}
                  />

                  <p className="text-4xl text-white font-extralight leading-tight">
                    {block.subheading}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-4/12">
                <div className="w-full h-[350px] bg-primary rounded-2xl relative">
                  {typeof block?.image === 'object' && block.image.url && (
                    <Image
                      src={block.image.url}
                      alt={block.image.alt}
                      width={800}
                      height={600}
                      priority
                      className="absolute bottom-0"
                      draggable={false}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 bg-gray-950 rounded-2xl p-6">
                  <a
                    href={block.cta_button.url}
                    className="px-4 py-2 border border-primary text-primary rounded-full max-w-fit font-light"
                    draggable={false}
                  >
                    {block.cta_button.label}
                  </a>
                  <p className="text-white text-lg font-extralight">{block.turing}</p>
                </div>
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
