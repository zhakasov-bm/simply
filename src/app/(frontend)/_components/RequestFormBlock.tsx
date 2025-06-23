'use client'

import { Component } from '@/payload-types'
import { useState } from 'react'
import Image from 'next/image'

type RequestFormProps = Extract<Component['globals'][0], { blockType: 'request-form' }>
type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

export default function RequestFormBlock({ block }: { block: RequestFormProps }) {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  })

  /**
   * Handles the form submission
   * @param e
   * @returns
   */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!block.form || typeof block.form !== 'object') return

    setFormState({
      loading: true,
      error: null,
      success: false,
    })

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        body: JSON.stringify({
          form: block.form.id,
          submissionData: Object.entries(data)?.map(([field, value]) => ({
            field,
            value: value as string,
          })),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      setFormState({
        loading: false,
        error: null,
        success: true,
      })

      //Reset the form
      ;(e.target as HTMLFormElement).reset()

      //Reset form after 5 seconds
      setTimeout(() => {
        setFormState({
          loading: false,
          error: null,
          success: false,
        })
      }, 5000)
    } catch (error) {
      console.error(error)
      setFormState({
        loading: false,
        error: 'Failed to submit form',
        success: false,
      })
    }
  }

  return (
    <section className="hidden lg:container mx-auto py-24 px-16">
      <h1 className="text-4xl text-center pb-12">{block.heading}</h1>
      <div
        className="flex"
        style={{
          backgroundImage: 'url("/contact-graphic.svg")',
          width: '100%',
          height: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        {/* Left Side */}
        <div className="flex flex-col gap-5 w-1/2 p-40">
          <h1 className="text-3xl pb-4">{block.title}</h1>
          {block.contacts?.map((contact, i) => (
            <div key={i}>
              {typeof contact.icon === 'object' && contact.icon.url && (
                <div className="flex gap-3">
                  <Image
                    src={contact.icon.url}
                    alt={contact.icon.alt}
                    width={24}
                    height={24}
                    className="contain"
                    draggable={false}
                  />
                  <p className="font-light">{contact.item}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="w-1/2 py-40 pr-24">
          {typeof block?.form === 'object' && block?.form?.title === 'requestForm' && (
            <div className="flex flex-col gap-6">
              <form
                className="flex flex-col gap-3 items-stretch font-inter"
                onSubmit={handleSubmit}
              >
                {block.form.fields?.map((field: any) => (
                  <div key={field.name} className="relative flex-1 min-w-[180px]">
                    <input
                      id={field.name}
                      type={field.blockType}
                      name={field.name}
                      required={field.required}
                      placeholder=" "
                      className="peer w-full rounded-2xl px-3 pt-5 pb-2 bg-white text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <label
                      htmlFor={field.name}
                      className="absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs cursor-text"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}

                <button
                  type="submit"
                  className="bg-black text-white px-5 h-[56px] rounded-2xl cursor-pointer font-unbounded hover:text-hover transition"
                >
                  {block.form.submitButtonLabel || 'Submit'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
