import { Solution } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import clsx from 'clsx'

export default function WhyServiceNeeded({ solution }: { solution: Solution }) {
  const items = solution.whyList || []

  const cardStyles = [
    { bg: 'bg-background' },
    { bg: 'bg-primary', reverse: true, text: 'text-black' },
    { bg: 'bg-background' },
  ]

  return (
    <section id="problems" className="container-class">
      {solution.whyServiceTitle && <RichText data={solution.whyServiceTitle} />}

      <div className="flex flex-col md:flex-row gap-3 pt-8">
        {items.slice(0, 3).map((item, i) => {
          const { bg, reverse, text } = cardStyles[i] || {}
          return (
            <div
              key={i}
              className={clsx(
                'flex flex-col p-8 rounded-custom justify-between items-center flex-1 gap-5 transition-all',
                bg,
                reverse && 'flex-col-reverse',
                text,
              )}
            >
              <span className="text-xl text-center">{item?.title || ''}</span>
              <div className={clsx('transition-transform duration-300 hover:scale-110')}>
                <Image
                  src={typeof item?.icon === 'string' ? item.icon : item?.icon?.url || '/img1.png'}
                  alt={typeof item?.icon === 'string' ? 'Why icon' : item?.icon?.alt || 'Why icon'}
                  width={240}
                  height={240}
                  className="object-contain"
                  draggable={false}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
