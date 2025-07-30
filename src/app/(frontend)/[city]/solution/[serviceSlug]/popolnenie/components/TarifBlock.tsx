import Image from 'next/image'
import { Subservice } from '@/payload-types'

type Props = {
  block: Extract<NonNullable<Subservice['additionalBlocks']>[number], { blockType: 'tarifblock' }>
}

export default function TarifBlock({ block }: Props) {
  return (
    <section id="tarif-block" className="container-class py-8">
      <h1 className="text-4xl pb-12 text-center">{block.tarifTitle}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {block.tarifs?.map((item, idx) => {
          const isNoCommission = item.commission === 'Без комиссии'

          return (
            <div
              key={idx}
              className="p-8 rounded-custom flex flex-col gap-2 border border-cityHover items-center text-center"
            >
              {typeof item.icon === 'object' && item.icon?.url && (
                <Image
                  src={item.icon.url}
                  alt={item.icon.alt || 'Icon'}
                  width={0}
                  height={10}
                  sizes="auto"
                  className="h-10 w-auto object-contain"
                  draggable={false}
                />
              )}

              <p className="text-xl font-inter font-medium pt-6">{item.type}</p>
              <p className="text-base font-light">{item.price}</p>

              <div className="bg-background py-2 px-6 rounded-3xl text-base font-inter mt-4 flex items-center gap-2">
                <span>{isNoCommission ? '🔥' : '💰'}</span>
                <span>{item.commission}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
