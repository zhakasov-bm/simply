import { Page } from '@/payload-types'
import Image from 'next/image'

type TrustedByProps = Extract<Page['layout'][0], { blockType: 'trusted-by' }>

export default function TrustedByBlock({ block }: { block: TrustedByProps }) {
  return (
    <section className="container mx-auto py-20">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl text-center font">{block.heading}</h1>
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
    </section>
  )
}
