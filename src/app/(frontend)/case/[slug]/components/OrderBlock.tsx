import { Case } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default function OrderBLock({ caseData }: { caseData: Case }) {
  return (
    <section id="order" className="container-class">
      <div className="flex flex-col-reverse md:flex-row-reverse gap-8 md:gap-20 p-6 md:py-16 md:px-12 bg-background rounded-custom">
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-3xl">{caseData.title}</h1>
          <RichText
            data={caseData.description}
            className="font-inter font-light text-lg md:text-xl"
          />
        </div>
        <div className="relative h-60 md:w-1/2">
          {typeof caseData.image === 'object' && caseData.image.url && (
            <Image
              src={caseData.image.url}
              alt={caseData.image.alt}
              fill
              className="contain"
              draggable={false}
            />
          )}
        </div>
      </div>
    </section>
  )
}
