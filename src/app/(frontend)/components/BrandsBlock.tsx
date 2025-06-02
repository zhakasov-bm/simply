import { Page } from '@/payload-types'
import Image from 'next/image'

type BrandsProps = Extract<Page['layout'][0], { blockType: 'brands' }>

export default function BrandsBlock({ block }: { block: BrandsProps }) {
  return (
    <section className="container mx-auto py-4">
      <div className="flex flex-col gap-12">
        <h1 className="text-4xl text-center font">{block.heading}</h1>
        <div className="flex justify-between gap-24">
          {block.logos?.map((item, i) => (
            <div key={i} className="w-full h-24 relative">
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
    </section>
  )
}
