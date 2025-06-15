import { RichText } from '@payloadcms/richtext-lexical/react'
import UniversalButton from '../../_components/UniversalButton'
import { Solution } from '@/payload-types'

export default function LeadBlock({ solution }: { solution: Solution }) {
  return (
    <section className="container mx-auto py-20">
      <div className="bg-greenBG rounded-2xl items-center text-center py-12 px-40 mt-20">
        <RichText data={solution.Lead} />
      </div>
      <UniversalButton label="Заказать" className="my-6 w-full" />
    </section>
  )
}
