'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Solution } from '@/payload-types'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeroBlock from '../components/HeroBlock'

const page = async () => {
  const payload = await getPayload({ config: configPromise })

  let solutions: Solution[] = []

  try {
    let res = await payload.find({
      collection: 'solutions',
    })

    solutions = res.docs
  } catch (err) {
    console.log(err)
  }

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'solutions',
      },
    },
  })

  const blocks = page?.layout || []
  const [pageData, solutionsData] = await Promise.all([
    payload.find({ collection: 'pages', where: { slug: { equals: 'solutions' } } }),
    payload.find({ collection: 'solutions' }),
  ])

  return (
    <div className="container mx-auto py-20">
      <HeroBlock
        block={{
          heading: 'Welcome to Solutions',
          subheading: 'Explore our best services for your business',
          image: '/hero-image.jpg', // немесе Media объект
          turing: 'Some turing info',
          cta_button: {
            label: 'Get Started',
            url: '/contact',
          },
          blockType: 'hero',
        }}
      />
      <h1 className="text-3xl text-teal-400">Salem Alem</h1>

      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {solutions.map((solution) => {
            return (
              <Link
                href={`/solution/${solution.id}`}
                key={solution.id}
                className="bg-lightBG rounded-2xl p-6 flex hover:border-primary transition ease-in-out duration-100 overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl">{solution.name}</h1>
                  <div className="flex flex-wrap w-full gap-2 py-2">
                    {solution.details?.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 border border-black/20 rounded-2xl text-sm"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  {typeof solution.icon === 'object' && solution.icon.url && (
                    <Image
                      src={solution.icon.url}
                      alt={solution.icon.alt}
                      width={200}
                      height={200}
                      className="contain"
                      draggable={false}
                    />
                  )}
                </div>
              </Link>
            )
          })}
        </Suspense>
      </div>
    </div>
  )
}

export default page
