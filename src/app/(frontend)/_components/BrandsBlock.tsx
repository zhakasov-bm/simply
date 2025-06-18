import { Component } from '@/payload-types'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

type Props = {
  component: Component
  isLabel?: boolean
}

export default function BrandsBlockBlock({ component, isLabel = false }: Props) {
  return (
    <section className="py-16">
      {component.globals.map((block, id) => {
        if (block.blockType === 'brands') {
          return (
            <div key={id} className="flex flex-col gap-12">
              {isLabel && <h1 className="text-4xl text-center pb-10">{block.heading}</h1>}
              <Marquee
                pauseOnHover={true}
                speed={50} // Adjust speed as needed
                gradient={true} // Optional: adds fade effect at edges
                gradientWidth={50} // Optional: width of the gradient
              >
                {block.logos?.map((item, i) => (
                  <div key={i} className="w-40 h-24 mx-8 relative flex-shrink-0">
                    {' '}
                    {/* Added mx-8 for horizontal spacing and flex-shrink-0 */}
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
              </Marquee>
            </div>
          )
        }
      })}
    </section>
  )
}
