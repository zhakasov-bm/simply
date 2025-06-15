import { Solution } from '@/payload-types'

export default function ProblemBlock({ solution }: { solution: Solution }) {
  return (
    <section className="container mx-auto py-20">
      <h1 className="text-4xl pb-12 text-center">{solution.titleWhy}</h1>
      <div className="grid grid-cols-3 gap-5">
        {solution.problem?.map((item, i) => (
          <div key={i} className="flex flex-col gap-2 bg-lightBG rounded-2xl p-5">
            <div className="w-12 h-12 bg-primary mb-4 rounded-lg flex items-center justify-center">
              {i + 1}
            </div>

            <h1 className="text-lg">{item.title}</h1>
            <p className="font-inter font-normal text-base text-black/60">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
