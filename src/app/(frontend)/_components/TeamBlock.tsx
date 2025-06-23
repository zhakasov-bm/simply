import { Component } from '@/payload-types'
import Image from 'next/image'

export default function TeamBlock({ component }: { component: Component }) {
  return (
    <section className="container-class">
      <div className=" bg-lightBG rounded-custom">
        {component.globals.map((block, id) => {
          if (block.blockType === 'team') {
            return (
              <div key={id} className="flex flex-col gap-20 p-8 md:py-16 md:px-25">
                <div className="flex flex-col md:flex-row gap-4 justify-start md:justify-between">
                  <h1 className="text-4xl md:w-1/2">{block.heading}</h1>
                  <div className="flex flex-col gap-8 md:w-1/2">
                    <p className="text-lg font-inter">{block.description}</p>
                    <Image
                      src="/sticker-team.svg"
                      alt="sticker"
                      width={100}
                      height={100}
                      draggable={false}
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-6">
                  {block.avatars?.map((item, i) => (
                    <div key={i} className="w-full relative">
                      {typeof item.avatar === 'object' && item.avatar.url && (
                        <Image
                          src={item.avatar.url}
                          alt={item.avatar.alt}
                          width={200}
                          height={200}
                          className="contain"
                          draggable={false}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        })}
      </div>
    </section>
  )
}
