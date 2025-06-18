import Image from 'next/image'
import Link from 'next/link'
import { Component } from '@/payload-types'
import UniversalButton from './UniversalButton'

export default function HeroBlock({ component }: { component: Component }) {
  return (
    <section className="py-24">
      {component.globals.map((block, id) => {
        if (block.blockType === 'hero') {
          return (
            <div key={id} className="flex gap-3 container mx-auto px-16">
              {/* Left */}
              <div className="flex flex-col gap-16 flex-8/12">
                <h1 className="lg:text-6xl font-medium leading-tight">{block.heading}</h1>

                <div
                  className="h-full px-9 pb-15 flex flex-col gap-5 justify-end overflow-hidden relative rounded-custom"
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
                    <UniversalButton label="Погрузиться в креатив" />
                  </div>
                  <Image
                    src="/graphic.png"
                    alt="graphic"
                    width={500}
                    height={500}
                    className="absolute top-[-120px] right-[-80px] w-[300px]"
                    draggable={false}
                  />
                  <Image
                    src="/star.svg"
                    alt="star"
                    width={500}
                    height={500}
                    className="absolute top-[90px] left-[10px] max-w-fit"
                    draggable={false}
                  />

                  <p className="text-3xl text-white font-extralight leading-tight pr-16">
                    {block.subheading}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-3 flex-4/12">
                <div className="w-full h-[300px] bg-primary rounded-custom relative">
                  {typeof block?.image === 'object' && block.image.url && (
                    <Image
                      src="/hero-bala.svg"
                      alt={block.image.alt}
                      width={360}
                      height={300}
                      priority
                      className="absolute left-1/2 transform -translate-x-1/2 bottom-0"
                      draggable={false}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3 bg-gray-950 rounded-custom p-7">
                  <Link
                    href={block.cta_button.url}
                    className="px-4 py-2 border border-primary/80
                     text-primary/90 text-sm rounded-custom max-w-fit font-light hover:text-primary transition duration-300"
                    draggable={false}
                  >
                    {block.cta_button.label}
                  </Link>
                  <p className="text-white text-lg font-extralight font-inter">{block.turing}</p>
                </div>
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
