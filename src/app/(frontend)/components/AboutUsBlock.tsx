import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type AboutProps = Extract<Page['layout'][0], { blockType: 'about' }>

export default function AboutUsBlock({ block }: { block: AboutProps }) {
  return (
    <section
      className="container mx-auto py-20"
      style={{
        backgroundImage: 'url("graphic.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
      }}
    >
      <div className="flex gap-20">
        <div className="flex flex-col flex-1/2 gap-4">
          <h1 className="text-4xl font-medium">{block.heading}</h1>
          <RichText data={block.content} className="text-lg font-inter font-normal" />
        </div>

        {/* //Stats Cards */}
        <div className="flex-1/2">
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {block.statistics?.map((stat, i) => (
              <div
                key={i}
                className={`
                bg-black text-white rounded-xl p-6 shadow-md flex flex-col gap-2
                ${i === 2 ? 'col-span-2' : ''}
                `}
              >
                <h3 className="text-4xl font-medium mb-2">{stat.title}</h3>
                <p className="text-lg font-inter font-light">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
