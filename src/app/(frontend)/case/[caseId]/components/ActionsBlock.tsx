import { Case } from '@/payload-types'

export default function ActionsBlock({ caseData }: { caseData: Case }) {
  return (
    <section
      className="container mx-auto py-20"
      style={{
        backgroundImage: 'url("/graphic.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
      }}
    >
      <div className="flex gap-10">
        <div className="flex flex-col gap-4 w-1/3">
          <h1 className="text-5xl">{caseData.actionTitle}</h1>
        </div>
        <div className="grid grid-cols-2 gap-5 w-2/3">
          {caseData.actions?.map((item, i) => (
            <div className="flex flex-col gap-2 bg-lightBG rounded-2xl p-6" key={i}>
              <h1 className="text-xl">{item.title}</h1>
              <p className="font-light font-inter text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
