import Breadcrumbs from '@/app/(frontend)/_components/Breadcrumbs/Breadcrumbs'
import UniversalButton from '@/app/(frontend)/_components/UniversalButton'
import { Case } from '@/payload-types'

export default function Hero({ caseData }: { caseData: Case }) {
  return (
    <section className="container mx-auto pt-8 md:pb-20 flex flex-col items-center text-center">
      <div className="flex flex-col items-center gap-5 max-w-5xl p-8 md:p-0">
        {/* Breadcrumbs */}
        <div className="mb-8 px-6 md:px-0 flex justify-center">
          <Breadcrumbs customLabels={{ case: 'Кейсы', [caseData.slug]: caseData.heading }} />
        </div>
        <h1 className="text-6xl">{caseData.heading}</h1>
        <p className="text-base md:text-2xl font-light">{caseData.subtitle}</p>
        <UniversalButton label="Обсудить проект" className="mt-8 max-w-fit" to="#contact" />
      </div>
    </section>
  )
}
