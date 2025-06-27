'use client'

import { Component } from '@/payload-types'
import { useState } from 'react'

type LeadCaptureProps = Extract<Component['globals'][0], { blockType: 'form' }>
type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

export default function LeadCaptureBlock({ block }: { block: LeadCaptureProps }) {
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
    <section className="container mx-auto my-16 lg:my-20 px-6 lg:px-16">
      <div className=" bg-lightBG rounded-custom">
        {typeof block?.form === 'object' && block?.form?.title === 'leadCaptureForm' && (
          <div className="flex flex-col gap-6 py-10 px-4 md:px-8">
            <h3 className="text-xl md:text-2xl leadForm text-center">{block.heading}</h3>
            <form
              className="flex flex-col lg:flex-row gap-2 items-stretch font-inter"
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
                    className="peer w-full rounded-lg px-3 pt-5 pb-2 bg-white text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                className="bg-primary text-black px-5 rounded-xl py-4 lg:h-min-full cursor-pointer font-unbounded hover:bg-hover transition"
              >
                {block.form.submitButtonLabel || 'Submit'}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
