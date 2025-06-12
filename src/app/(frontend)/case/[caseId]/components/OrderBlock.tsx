import { Case } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default function OrderBLock({ caseData }: { caseData: Case }) {
  return (
    <section className="container mx-auto py-20">
      <div className="flex flex-row-reverse gap-20 py-16 px-12 bg-lightBG rounded-2xl">
        <div className="flex flex-col gap-4 w-1/2">
          <h1 className="text-3xl">{caseData.title}</h1>
          <RichText data={caseData.description} className="font-inter font-light text-xl" />
        </div>
        <div className="relative w-1/2">
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
