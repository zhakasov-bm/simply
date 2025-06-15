import { Case } from '@/payload-types'
import Image from 'next/image'

export default function ResultsBlock({ caseData }: { caseData: Case }) {
  return (
    <section className="container mx-auto py-20">
      <h1 className="text-5xl pb-10">{caseData.resultTitle}</h1>
      <div className="flex gap-10">
        <div className="grid grid-cols-2 gap-4 w-2/3">
          {caseData.results?.map((item, i) => (
            <div className="flex flex-col gap-2 bg-lightBG rounded-2xl p-6" key={i}>
              <h1 className="text-5xl">{item.value}</h1>
              <p className="font-light font-inter text-lg">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="relative w-1/3">
          {caseData['result-image'] &&
            typeof caseData['result-image'] === 'object' &&
            caseData['result-image'].url && (
              <Image
                src={caseData['result-image'].url}
                alt={caseData['result-image'].alt}
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
