import { RichText } from '@payloadcms/richtext-lexical/react'
import { Component } from '@/payload-types'

export default function AboutUsBlock({ component }: { component: Component }) {
  return (
    <section
      className="container-class"
      style={{
        backgroundImage: 'url("graphic.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
      }}
    >
      {component.globals.map((block, id) => {
        if (block.blockType === 'about') {
          return (
            <div key={id} className="flex flex-col gap-8 lg:flex-row lg:gap-20">
              <div className="flex flex-col flex-1/2 gap-5">
                <h1 className="lg:text-4xl lg:text-left">{block.heading}</h1>
                <RichText
                  data={block.content}
                  className="text-lg md:text-xl font-inter font-normal"
                />
              </div>

              {/* //Stats Cards */}
              <div className="flex-1/2">
                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                  {block.statistics?.map((stat, i) => (
                    <div
                      key={i}
                      className={`
                bg-background lg:bg-heroBG lg:text-white rounded-custom p-4 lg:p-5 lg:py-6 lg:px-8 lg:shadow-md flex flex-col gap-1 lg:gap-2
                ${i === 2 ? 'col-span-2' : ''}
                `}
                    >
                      <span className="text-2xl lg:text-4xl lg:font-medium lg:mb-2">
                        {stat.title}
                      </span>
                      <p className="text-xs lg:text-lg font-inter font-light">{stat.description}</p>
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
