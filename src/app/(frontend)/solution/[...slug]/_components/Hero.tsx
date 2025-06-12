import { Component, Solution } from '@/payload-types'

type Props = {
  component: Component
  solution: Solution
}

export default function Hero({ component, solution }: Props) {
  return (
    <section className="container mx-auto py-20 flex flex-col items-center text-center">
      <div className="flex flex-col gap-4 max-w-5xl">
        <h1 className="text-6xl">{solution.name}</h1>
        <p className="text-2xl font-light">{solution.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 mt-20 max-w-5xl w-full">
        {component.statistics?.map((item, i) => (
          <div className="flex flex-col gap-1 items-center p-6" key={i}>
            <h1 className="text-6xl">{item.text}</h1>
            <p className="text-base font-light">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
