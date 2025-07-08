import Image from 'next/image'
import { Subservice } from '@/payload-types'
import UniversalButton from '@/app/(frontend)/_components/UniversalButton'

type Props = {
  block: Extract<NonNullable<Subservice['additionalBlocks']>[number], { blockType: 'tarifblock' }>
}

export default function Calculator({ block }: Props) {
  return (
    <section className="bg-background py-1">
      <h1 className="text-4xl pb-12 text-center">Калькулятора зачислений</h1>
      <div className="container-class">
        <div className="flex gap-2">
          <div className="flex flex-col">
            <div className="grid grid-cols-3">
              {block.tarifs?.map((item, idx) => {
                return (
                  <div key={idx}>
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
                  </div>
                )
              })}
            </div>
            <p>Введите сумму</p>
            <input type="number" placeholder="Минимум 100000" />
          </div>

          <div className="flex flex-col">
            <p>Сумма к зачислению:</p>
            <span></span>
            <UniversalButton label="Рассчитать" />
          </div>
        </div>
      </div>
    </section>
  )
}
