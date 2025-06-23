import { Solution } from '@/payload-types'
import Image from 'next/image'

const ProblemCard = ({
  number,
  title,
  subtitle,
  numberSize = 440,
  className = '',
}: {
  number: number
  title: string
  subtitle: string
  numberSize?: number
  topOffset?: string
  className?: string
}) => (
  <div
    className={`flex flex-col gap-2 bg-blueBG rounded-2xl p-6 pt-16 overflow-hidden relative justify-end flex-1/3 ${className}`}
  >
    <div
      className="text-black/5 font-bold font-montserrat absolute top-10 right-0 leading-none"
      style={{ fontSize: `${numberSize}px` }}
    >
      {number}
    </div>
    <h1 className="text-lg">{title}</h1>
    <p className="font-inter font-normal text-base text-black/60">{subtitle}</p>
  </div>
)

const Connector = ({ src, className = '' }: { src: string; className?: string }) => (
  <div className={className}>
    <Image
      src={src}
      alt="connector"
      width={src.includes('90') ? 60 : 20}
      height={src.includes('90') ? 20 : 60}
    />
  </div>
)

export default function ProblemBlock({ solution }: { solution: Solution }) {
  // Early return if no problem data exists
  if (!solution.problem || solution.problem.length === 0) {
    return null
  }

  return (
    <section className="container-class">
      <h1 className="text-4xl pb-12 text-center">{solution.titleWhy}</h1>
      {!solution.hasSubservices && (
        <div className="grid grid-col-1 lg:grid-cols-3 gap-5">
          {solution.problem?.map((item, i) => (
            <div key={i} className="flex flex-col gap-2 bg-lightBG rounded-2xl p-6">
              <div className="w-12 h-12 bg-primary mb-4 rounded-lg flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="text-lg">{item.title}</h3>
              <p className="font-inter font-normal text-base text-black/60">{item.subtitle}</p>
            </div>
          ))}
        </div>
      )}
      {solution.hasSubservices && solution.problem.length >= 4 && (
        <div className="flex">
          <ProblemCard
            number={1}
            title={solution.problem[0]?.title || ''}
            subtitle={solution.problem[0]?.subtitle || ''}
          />

          <Connector src="/connector.svg" className="pt-16" />

          <div className="flex flex-col relative items-center flex-1/3">
            <ProblemCard
              number={2}
              title={solution.problem[1]?.title || ''}
              subtitle={solution.problem[1]?.subtitle || ''}
              numberSize={200}
              className="w-full"
            />
            <Connector src="/connector-90.svg" />
            <ProblemCard
              number={3}
              title={solution.problem[2]?.title || ''}
              subtitle={solution.problem[2]?.subtitle || ''}
              numberSize={200}
              className="w-full"
            />
          </div>

          <Connector src="/connector.svg" className="pt-70" />

          <ProblemCard
            number={4}
            title={solution.problem[3]?.title || ''}
            subtitle={solution.problem[3]?.subtitle || ''}
          />
        </div>
      )}
    </section>
  )
}
