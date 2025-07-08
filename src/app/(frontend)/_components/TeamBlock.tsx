import { Component } from '@/payload-types'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

export default function TeamBlock({ component }: { component: Component }) {
  return (
    <section id="team" className="container-class dark">
      <div className="bg-background rounded-custom">
        {component.globals.map((block, id) => {
          if (block.blockType === 'team') {
            return (
              <div key={id} className="flex flex-col gap-16 md:gap-20 py-6 md:py-16">
                <div className="flex flex-col md:flex-row gap-4 justify-start md:justify-between px-6 md:px-25">
                  <h1 className="text-left text-4xl md:w-1/2">{block.heading}</h1>
                  <div className="flex flex-col gap-8 md:w-1/2">
                    <p className="leading-5 text-lg font-inter">{block.description}</p>
                    <Image
                      src="/sticker-team.svg"
                      alt="sticker"
                      width={100}
                      height={100}
                      draggable={false}
                    />
                  </div>
                </div>

                <div className="">
                  <Marquee speed={50}>
                    {block.avatars?.map((item, i) => (
                      <div
                        key={i}
                        className="w-32 h-32 md:w-40 md:h-40 mx-2 relative flex-shrink-0"
                      >
                        {' '}
                        {typeof item.avatar === 'object' && item.avatar.url && (
                          <Image
                            src={item.avatar.url}
                            alt={item.avatar.alt}
                            fill
                            className="contain"
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
      </div>
    </section>
  )
}
