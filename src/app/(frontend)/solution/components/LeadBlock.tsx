import { RichText } from '@payloadcms/richtext-lexical/react'
import UniversalButton from '../../_components/UniversalButton'
import { Solution } from '@/payload-types'

export default function LeadBlock({ solution }: { solution: Solution }) {
  return (
    <section className="container-class">
      <div className="bg-greenBG rounded-custom items-center text-center p-6 md:py-12 md:px-40 mt-20">
        <RichText data={solution.Lead} />
      </div>
      <UniversalButton label="Обсудить проект" className="my-6 w-full" />
    </section>
  )
}
