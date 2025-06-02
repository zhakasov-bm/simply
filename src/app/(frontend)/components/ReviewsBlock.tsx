'use client'

import { Page } from '@/payload-types'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'

type ReviewsProps = Extract<Page['layout'][0], { blockType: 'reviews' }>

export default function ReviewsBlock({ block }: { block: ReviewsProps }) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 16,
    },
    loop: true,
  })

  return (
    <section className="my-40 relative">
      <Image
        src="/cam1.png"
        alt="camera"
        width={300}
        height={300}
        draggable={false}
        className="absolute bottom select-none"
      />
      <Image
        src="/cam2.png"
        alt="camera"
        width={300}
        height={300}
        draggable={false}
        className="absolute right-0 -bottom-20 h-auto z-1 select-none"
      />
      <div className="flex flex-col container mx-auto">
        <h1 className="text-4xl pb-12 text-center">{block.heading}</h1>
        <div ref={sliderRef} className="keen-slider flex justify-between overflow-hidden">
          {block.reviews?.map((review, i) => (
            <div className="keen-slider__slide font-inter flex flex-col gap-20 bg-lightBG p-8 rounded-2xl">
              <p>{review.message}</p>
              <div className="flex gap-3">
                {typeof review.avatar === 'object' && review.avatar.url && (
                  <Image
                    src={review.avatar.url}
                    alt={review.avatar.alt}
                    width={60}
                    height={60}
                    className="contain"
                  />
                )}
                <div className="flex flex-col gap-0 text-lg">
                  <p className="font-bold">{review.author}</p>
                  <p>{review.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
