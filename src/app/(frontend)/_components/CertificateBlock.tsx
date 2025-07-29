import { Component } from '@/payload-types'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

export default function CertificateBlock({ component }: { component: Component }) {
  return (
    <section className="container mx-auto my-16 lg:my-20 lg:px-16">
      {component.globals.map((block, id) => {
        if (block.blockType === 'certificate') {
          return (
            <div key={id}>
              <h1 className="text-4xl px-6 pb-8 md:pb-12 text-center">{block.heading}</h1>

              <div className="hidden md:flex flex-col-reverse lg:flex-row bg-background rounded-3xl p-8 md:p-15">
                {/* Certificates Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full h-full lg:w-1/2 pr-28">
                  {block.certificates?.map((item, id) => (
                    <div
                      key={id}
                      className="relative w-full aspect-square bg-inputBG rounded-full overflow-hidden flex items-center justify-center"
                    >
                      {typeof item.certificate === 'object' && item.certificate.url && (
                        <Image
                          src={item.certificate.url}
                          alt={item.certificate.alt || 'Certificate'}
                          fill
                          className="object-contain p-7"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Descriptions */}
                <div className="flex flex-col gap-6 w-full lg:w-1/2">
                  {block.descriptions?.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-4 md:p-6 md:bg-inputBG font-inter rounded-2xl md:shadow-sm"
                    >
                      <span className="text-xl font-semibold">{item.title}</span>
                      <p className="text-base font-light">{item.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:hidden">
                <Marquee speed={50} gradient={true} gradientWidth={50}>
                  {block.certificates?.map((item, i) => (
                    <div key={i} className="w-24 h-24 mx-4 relative flex-shrink-0">
                      {' '}
                      {typeof item.certificate === 'object' && item.certificate.url && (
                        <Image
                          src={item.certificate.url}
                          alt={item.certificate.alt}
                          fill
                          className="object-contain"
                          draggable={false}
                        />
                      )}
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
