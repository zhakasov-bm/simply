import { Page } from '@/payload-types'
import Image from 'next/image'

type TeamProps = Extract<Page['layout'][0], { blockType: 'team' }>

export default function TeamBlock({ block }: { block: TeamProps }) {
  return (
    <section className="container mx-auto my-40 bg-lightBG rounded-3xl">
      <div className="flex flex-col gap-20 py-16 px-25">
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
    </section>
  )
}
