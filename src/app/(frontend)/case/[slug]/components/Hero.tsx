import { Case } from '@/payload-types'
import Link from 'next/link'

export default function Hero({ caseData }: { caseData: Case }) {
  return (
    <section
      className="container mx-auto py-20 flex flex-col items-center text-center"
      style={{
        backgroundImage: 'url("/wave.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center right',
        backgroundSize: 'contain',
      }}
    >
      <div className="flex flex-col gap-4 max-w-5xl">
        {/* <div className="flex gap-2 text-xs text-center font-light">
          <Link href="/">Main</Link>
          <Link href="/">Case</Link>
          <Link href="/">{caseData.slug}</Link>
        </div> */}
        <h1 className="text-6xl">{caseData.heading}</h1>
        <p className="text-2xl font-light">{caseData.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 mt-20 max-w-5xl w-full"></div>
    </section>
  )
}
