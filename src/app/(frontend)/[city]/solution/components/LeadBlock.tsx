import { RichText } from '@payloadcms/richtext-lexical/react'
import UniversalButton from '../../../_components/UniversalButton'
import { Solution } from '@/payload-types'

export default function LeadBlock({ solution }: { solution: Solution }) {
  return (
    <section className="container mx-auto my-16 lg:my-20 px-6 lg:px-16">
      <div className="bg-greenBG rounded-custom items-center text-center p-6 md:py-12 md:px-40 mt-20">
        <RichText data={solution.lead} />
      </div>
      <UniversalButton label="Обсудить проект" className="my-6 w-full" />
    </section>
  )
}
