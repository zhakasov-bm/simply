import UniversalButton from '@/app/(frontend)/_components/UniversalButton'
import { Case } from '@/payload-types'

export default function Hero({ caseData }: { caseData: Case }) {
  return (
    <section
      className="container mx-auto pt-20 md:pb-20 flex flex-col items-center text-center"
      style={{
        backgroundImage: 'url("/wave.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center right',
        backgroundSize: 'contain',
      }}
    >
      <div className="flex flex-col items-center gap-5 max-w-5xl p-8 md:p-0">
        {/* <div className="flex gap-2 text-xs text-center font-light">
          <Link href="/">Main</Link>
          <Link href="/">Case</Link>
          <Link href="/">{caseData.slug}</Link>
        </div> */}
        <h1 className="text-6xl">{caseData.heading}</h1>
        <p className="text-base md:text-2xl font-light">{caseData.subtitle}</p>
        <UniversalButton label="Обсудить проект" className="mt-8 max-w-fit" />
      </div>
    </section>
  )
}
