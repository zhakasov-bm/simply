import { Page } from '@/payload-types'
import Image from 'next/image'

type HeroProps = Extract<Page['layout'][0], { blockType: 'hero' }>

export default function HeroBlock({ block }: { block: HeroProps }) {
  return (
    <section
      className=" py-30"
      style={{
        backgroundImage: 'url("wave.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center right',
        backgroundSize: 'contain',
      }}
    >
      <div className="flex gap-4 container mx-auto">
        <div className="flex flex-col gap-8 flex-8/12">
          <h1 className="lg:text-6xl font-medium mt-8 leading-tight">{block.heading}</h1>
          <div className="bg-gray-950 rounded-2xl px-9 pb-15 h-full flex flex-col gap-4 justify-end relative overflow-hidden">
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

            <p className="text-4xl text-white font-extralight leading-tight">{block.subheading}</p>
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

        {/* <p>{block.subheading}</p>
        {typeof block?.image === 'object' && block.image.url && (
          <Image src={block.image.url} alt={block.image.alt} width={800} height={600} priority />
        )}
        <a href={block.cta_button.url}>{block.cta_button.label}</a> */}
      </div>
    </section>
  )
}
