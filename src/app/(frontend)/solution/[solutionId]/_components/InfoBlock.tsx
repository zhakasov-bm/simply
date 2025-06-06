import { Solution } from '@/payload-types'
import Image from 'next/image'

export default function InfoBlock({ solution }: { solution: Solution }) {
  return (
    <section
      className="container mx-auto py-20"
      style={{
        backgroundImage: 'url("/graphic.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
      }}
    >
      <h1 className="text-4xl pb-12 text-center">{solution.heading}</h1>
      <div className="bg-lightBG rounded-2xl p-10 flex items-center gap-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl">{solution.title}</h1>
          <p className="font-inter font-normal text-xl text-black/60">{solution.description}</p>
        </div>
        <div className="h-full">
          {typeof solution.icon === 'object' && solution.icon.url && (
            <Image
              src={solution.icon.url}
              alt={solution.icon.alt}
              width={1000}
              height={1000}
              className="contain"
              draggable={false}
            />
          )}
        </div>
      </div>
    </section>
  )
}
