import clsx from 'clsx'
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default function About({ page }: { page: Page }) {
  return (
    <section
      id="about-company"
      className="container-class"
      style={{
        backgroundImage: 'url("graphic.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
      }}
    >
      {(page.layout ?? []).map((block, id) => {
        if (block.blockType === 'company') {
          return (
            <div key={id} className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-8">
                <h2 className="hidden md:block text-3xl flex-1/3">{block.title}</h2>
                <div className="flex flex-wrap flex-row gap-2">
                  {block.statistics?.map((item, id) => (
                    <div
                      key={id}
                      className={clsx(
                        'rounded-custom flex flex-col gap-4 justify-between p-5 md:p-6 flex-1',
                        {
                          'bg-primary text-black': item.bgColor === 'primary',
                          'bg-background': item.bgColor === 'background',
                        },
                      )}
                    >
                      <span className="text-xl md:text-3xl">{item.value}</span>
                      <p className="font-inter text-base">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-background p-8 rounded-custom">
                <RichText data={block.about} />
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
