import { Component } from '@/payload-types'
import Image from 'next/image'

export default function TeamBlock({ component }: { component: Component }) {
  return (
    <section className="container mx-auto p-16">
      <div className=" bg-lightBG rounded-custom">
        {component.globals.map((block, id) => {
          if (block.blockType === 'team') {
            return (
              <div key={id} className="flex flex-col gap-20 py-16 px-25">
                <div className="flex justify-between">
                  <h1 className="text-4xl w-1/2">{block.heading}</h1>
                  <div className="flex flex-col gap-8 w-1/2">
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
