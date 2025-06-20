import { RichText } from '@payloadcms/richtext-lexical/react'
import UniversalButton from '../../_components/UniversalButton'
import { Solution } from '@/payload-types'

export default function LeadBlock({ solution }: { solution: Solution }) {
  return (
    <section className="container mx-auto pb-20 px-16">
      <div className="bg-greenBG rounded-custom items-center text-center py-12 px-40 mt-20">
        <RichText data={solution.Lead} />
      </div>
      <UniversalButton label="Обсудить проект" className="my-6 w-full" />
    </section>
  )
}
