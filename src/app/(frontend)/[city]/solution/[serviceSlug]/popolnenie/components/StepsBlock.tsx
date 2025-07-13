import { RichText } from '@payloadcms/richtext-lexical/react'
import { Subservice } from '@/payload-types'

type Props = {
  block: Extract<
    NonNullable<Subservice['additionalBlocks']>[number],
    { blockType: 'advantagesblock' }
  >
}
//Need Updates!!!
export default function StepsBlock({ block }: Props) {
  return (
    <section className="container-class pb-8">
      <RichText data={block.advantagesTitle} />
      <div className="grid grid-cols-3 gap-3 pt-8">
        {block.advantages?.map((adv, idx) => (
          <div
            key={idx}
            className="bg-blueBG py-5 px-8 rounded-custom relative overflow-hidden flex flex-col min-h-[240px]"
          >
            <div className="text-black/5 font-bold text-[240px] font-montserrat absolute top-0 right-0 leading-none">
              {idx + 1}
            </div>
            <div className="relative z-10 mt-auto pt-16 adv-richtext">
              {adv.advantage && <RichText data={adv.advantage} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
