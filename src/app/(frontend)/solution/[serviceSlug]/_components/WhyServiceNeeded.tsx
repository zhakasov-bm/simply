import { Solution } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

export default function WhyServiceNeeded({ solution }: { solution: Solution }) {
  return (
    <section className="container mx-auto py-20">
      {solution.whyServiceTitle && <RichText data={solution.whyServiceTitle} />}
      <div className="flex gap-5 pt-8">
        {solution.whyList?.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 items-center bg-lightBG p-10 rounded-2xl relative flex-1"
          >
            <p className="text-2xl text-center">{item.title}</p>
            {typeof item.icon === 'object' && item.icon?.url && (
              <Image
                src={item.icon.url}
                alt={item.icon.alt || ''}
                width={240}
                height={240}
                objectPosition="absolute bottom-0"
                className="contain"
                draggable={false}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
