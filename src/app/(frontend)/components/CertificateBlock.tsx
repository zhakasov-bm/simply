import { Page } from '@/payload-types'
import Image from 'next/image'

type CertificateProps = Extract<Page['layout'][0], { blockType: 'certificate' }>

export default function CertificateBlock({ block }: { block: CertificateProps }) {
  return (
    <section className="container mx-auto my-40">
      <h1 className="text-4xl pb-12 text-center">{block.heading}</h1>
      <div className="flex gap-20 bg-lightBG rounded-3xl">
        <div className="flex gap-6">
          {(() => {
            const firstColumn = block.certificates?.slice(0, 3) || []
            const secondColumn = block.certificates?.slice(3, 6) || []

            return (
              <div className="flex gap-6">
                {[firstColumn, secondColumn].map((column, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-4">
                    {column.map((item, i) => (
                      <div key={i}>
                        {typeof item.certificate === 'object' && item.certificate.url && (
                          <Image
                            src={item.certificate.url}
                            alt={item.certificate.alt || 'Certificate'}
                            width={800}
                            height={800}
                            className="contain"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
        <div className="flex flex-col gap-6 py-16">
          {block.descriptions?.map((item, i) => (
            <div key={i} className="flex flex-col gap-8 p-8 bg-white font-inter rounded-2xl">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-lg font-light">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
