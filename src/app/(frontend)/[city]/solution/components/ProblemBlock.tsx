'use client'

import { useEffect, useState } from 'react'
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
  className?: string
}) => (
  <div
    className={`flex flex-col gap-2 bg-blueBG rounded-2xl p-6 pt-16 overflow-hidden relative justify-end flex-1/3 ${className}`}
  >
    <div
      className="text-black/5 font-bold font-montserrat absolute top-10 right-0 leading-none select-none"
      style={{ fontSize: `${numberSize}px` }}
    >
      {number}
    </div>
    <div className="flex flex-col gap-2 z-10">
      <span className="text-lg text-black">{title}</span>
      <p className="font-inter font-normal text-base text-black/60">{subtitle}</p>
    </div>
  </div>
)

const SimpleProblemCard = ({
  number,
  title,
  subtitle,
  className = '',
}: {
  number: number
  title: string
  subtitle: string
  className?: string
}) => (
  <div className={`flex flex-col gap-2 bg-background rounded-2xl p-6 ${className}`}>
    <div className="w-12 h-12 bg-primary text-black mb-4 rounded-lg flex items-center justify-center">
      {number}
    </div>
    <span className="text-lg">{title}</span>
    <p className="font-inter font-normal text-base text-link/70">{subtitle}</p>
  </div>
)

const ProblemList = ({ problems }: { problems: { title: string; subtitle: string }[] }) => (
  <div className="grid grid-col-1 lg:grid-cols-3 gap-3 md:gap-5">
    {problems.map((item, i) => (
      <SimpleProblemCard key={i} number={i + 1} title={item.title} subtitle={item.subtitle} />
    ))}
  </div>
)

const MobileSubserviceProblems = ({
  problems,
}: {
  problems: { title: string; subtitle: string }[]
}) => (
  <div className="flex gap-4 overflow-x-auto hide-scrollbar">
    <div className="flex flex-col gap-2">
      {problems.map((item, i) => (
        <div key={i} className="flex flex-col gap-2 bg-blueBG rounded-custom p-6">
          <span className="text-lg text-black">{item.title}</span>
          <p className="font-inter font-normal text-base text-black/60">{item.subtitle}</p>
        </div>
      ))}
    </div>
  </div>
)

const DesktopSubserviceProblems = ({
  problems,
}: {
  problems: { title: string; subtitle: string }[]
}) => (
  <div className="flex">
    <ProblemCard
      number={1}
      title={problems[0]?.title || ''}
      subtitle={problems[0]?.subtitle || ''}
    />
    <Connector src="/connector.svg" className="pt-16" />
    <div className="flex flex-col relative items-center flex-1/3">
      <ProblemCard
        number={2}
        title={problems[1]?.title || ''}
        subtitle={problems[1]?.subtitle || ''}
        numberSize={200}
        className="w-full"
      />
      <Connector src="/connector-90.svg" />
      <ProblemCard
        number={3}
        title={problems[2]?.title || ''}
        subtitle={problems[2]?.subtitle || ''}
        numberSize={200}
        className="w-full"
      />
    </div>
    <Connector src="/connector.svg" className="pt-70" />
    <ProblemCard
      number={4}
      title={problems[3]?.title || ''}
      subtitle={problems[3]?.subtitle || ''}
    />
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
  const [dynamicType, setDynamicType] = useState<'mobile' | 'desktop'>('desktop')

  useEffect(() => {
    const handleResize = () => {
      setDynamicType(window.innerWidth < 768 ? 'mobile' : 'desktop')
    }

    handleResize() // initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!solution.problem || solution.problem.length === 0) return null

  return (
    <section id="plan" className="container-class">
      <h2 className="text-[22px] md:text-4xl pb-6 md:pb-12 text-center">{solution.titleWhy}</h2>

      {dynamicType === 'mobile' ? (
        // --------------------
        //  MOBILE VERSION
        // --------------------
        <>
          {!solution.hasSubservices && <ProblemList problems={solution.problem} />}
          {solution.hasSubservices && solution.problem.length >= 4 && (
            <MobileSubserviceProblems problems={solution.problem} />
          )}
        </>
      ) : (
        // DESKTOP VERSION

        <>
          {!solution.hasSubservices && <ProblemList problems={solution.problem} />}
          {solution.hasSubservices && solution.problem.length >= 4 && (
            <DesktopSubserviceProblems problems={solution.problem} />
          )}
        </>
      )}
    </section>
  )
}
