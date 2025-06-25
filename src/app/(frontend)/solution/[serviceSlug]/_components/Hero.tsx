import { Component, Solution, Subservice } from '@/payload-types'

type Props =
  | { component: Component; solution: Solution; subservice?: never }
  | { component: Component; subservice: Subservice; solution?: never }

export default function Hero(props: Props) {
  const { component } = props
  const title = props.solution?.name || props.subservice?.name
  const subtitle = props.solution?.subtitle || props.subservice?.subtitle

  return (
    <section className="container mx-auto py-20">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex flex-col gap-4 md:max-w-5xl p-6 md:p-0">
          <h1 className="text-6xl">{title}</h1>
          <p className="text-lg md:text-2xl font-light">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap:4 md:gap-8 px-6 md:px-12 mt-0 md:mt-20 max-w-5xl w-full justify-between">
          {component.statistics?.map((item, i) => (
            <div className="flex flex-col gap-1 items-start p-6" key={i}>
              <h1 className="text-6xl">{item.text}</h1>
              <p className="text-base font-light">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
