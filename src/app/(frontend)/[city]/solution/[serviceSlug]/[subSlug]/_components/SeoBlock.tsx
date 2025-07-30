import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { Subservice } from '@/payload-types'

type Props = {
  block: Extract<NonNullable<Subservice['additionalBlocks']>[number], { blockType: 'seoblock' }>
}

export default function SeoBlock({ block }: Props) {
  const { header, steps = [], designType } = block

  if (!designType) return null

  return (
    <section id="seo" className="container-class">
      {header && <RichText data={header} />}

      <div
        className={`grid gap-3 pt-8 md:pt-12 ${
          designType === 'layout1'
            ? 'grid-col-1 md:grid-cols-3'
            : designType === 'layout2'
              ? 'grid-col-1 md:grid-cols-4'
              : ''
        }`}
      >
        {steps.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 rounded-custom p-6 ${
              designType === 'layout1'
                ? 'bg-background'
                : designType === 'layout2'
                  ? 'bg-primary'
                  : ''
            }`}
          >
            {/* Layout 1 — Number badge */}
            {designType === 'layout1' && (
              <div className="w-12 h-12 bg-primary mb-4 text-black rounded-lg flex items-center justify-center">
                {i + 1}
              </div>
            )}

            {/* Layout 2 — Image icon */}
            {designType === 'layout2' &&
              item.icon &&
              typeof item.icon === 'object' &&
              'url' in item.icon &&
              item.icon.url && (
                <div className="relative w-15 h-15 mb-16">
                  <Image
                    src={item.icon.url}
                    alt={item.icon.alt || ''}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

            <span className={`text-base ${designType === 'layout2' ? 'text-black' : ''}`}>
              {item.title}
            </span>
            <p
              className={`font-inter font-normal text-base ${
                designType === 'layout2' ? 'text-black/60' : 'text-link/60'
              }`}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
