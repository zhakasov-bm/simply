import { Component } from '@/payload-types'
import Image from 'next/image'

export default function CertificateBlock({ component }: { component: Component }) {
  return (
    <section className="container mx-auto px-16 py-20">
      {component.globals.map((block, id) => {
        if (block.blockType === 'certificate') {
          return (
            <div key={id}>
              <h1 className="text-4xl pb-12 text-center">{block.heading}</h1>

              <div className="flex flex-col lg:flex-row bg-lightBG rounded-3xl p-15">
                {/* Certificates Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full h-full lg:w-1/2 pr-28">
                  {block.certificates?.map((item, id) => (
                    <div
                      key={id}
                      className="relative w-full aspect-square bg-white rounded-full overflow-hidden flex items-center justify-center"
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
                      className="flex flex-col gap-4 p-6 bg-white font-inter rounded-2xl shadow-sm"
                    >
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-base font-light text-gray-700">{item.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
