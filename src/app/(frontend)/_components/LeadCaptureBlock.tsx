'use client'

import { Component, Solution } from '@/payload-types'
import { useState, useEffect } from 'react'

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
  const [solutions, setSolutions] = useState<Solution[]>([])

  // Fetch solutions for category dropdown
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await fetch('/api/solutions')
        if (response.ok) {
          const data = await response.json()
          setSolutions(data.docs || [])
        }
      } catch (error) {
        console.error('Error fetching solutions:', error)
      }
    }

    fetchSolutions()
  }, [])

  // Get available services for category dropdown
  const getAvailableServices = () => {
    const regularSolutions = solutions.filter((solution) => !solution.maintenance)
    const categoryLabels: Record<string, string> = {
      content: 'Креатив и Контент',
      pr: 'Продвижение и PR',
      brand: 'Стратегия и Бренд',
      website: 'Сайты и Технологии',
    }

    return regularSolutions.map((solution) => ({
      value: solution.slug,
      label: solution.name,
      category: solution.category
        ? categoryLabels[solution.category] || solution.category
        : 'Другое',
    }))
  }

  /**
   * Handles the form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!block.form || typeof block.form !== 'object') {
      setFormState({
        loading: false,
        error: 'Form configuration is invalid',
        success: false,
      })
      return
    }

    setFormState({
      loading: true,
      error: null,
      success: false,
    })

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        body: JSON.stringify({
          form: block.form.id,
          submissionData: Object.entries(data).map(([field, value]) => ({
            field,
            value: value as string,
          })),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to submit form')
      }

      setFormState({
        loading: false,
        error: null,
        success: true,
      })

      // Reset the form
      ;(e.target as HTMLFormElement).reset()

      // Reset success state after 5 seconds
      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          success: false,
        }))
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setFormState({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to submit form',
        success: false,
      })
    }
  }

  // Render form field based on type
  const renderField = (field: any) => {
    const isCategoryField =
      field.name?.toLowerCase().includes('category') ||
      field.name?.toLowerCase().includes('услуга') ||
      field.name?.toLowerCase().includes('service')

    if (isCategoryField) {
      const availableServices = getAvailableServices()

      return (
        <div key={field.name} className="relative flex-1 min-w-[180px]">
          <select
            id={field.name}
            name={field.name}
            required={field.required}
            className="peer w-full rounded-lg px-3 pt-5 pb-2 bg-inputBG text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 appearance-none cursor-pointer"
          >
            <option value="">Выберите услугу</option>
            {availableServices.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          <label
            htmlFor={field.name}
            className="absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs cursor-text"
          >
            {field.label || 'Услуга'}
          </label>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      )
    }

    // Regular input field
    return (
      <div key={field.name} className="relative flex-1 min-w-[180px]">
        <input
          id={field.name}
          type={field.blockType === 'email' ? 'email' : 'text'}
          name={field.name}
          required={field.required}
          placeholder=" "
          className="peer w-full rounded-lg px-3 pt-5 pb-2 bg-inputBG text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <label
          htmlFor={field.name}
          className="absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs cursor-text"
        >
          {field.label}
        </label>
      </div>
    )
  }

  return (
    <section className="container mx-auto my-16 lg:my-20 px-6 lg:px-40">
      <div className="bg-background rounded-custom">
        {typeof block?.form === 'object' && block?.form?.title === 'leadCaptureForm' && (
          <div className="flex flex-col gap-6 py-10 px-4 md:px-12">
            <h3 className="text-xl md:text-2xl md:px-16 leadForm text-center">{block.heading}</h3>

            {/* Success Message */}
            {formState.success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
                Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
              </div>
            )}

            {/* Error Message */}
            {formState.error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
                {formState.error}
              </div>
            )}

            <form
              className="flex flex-col lg:flex-row gap-2 items-stretch font-inter"
              onSubmit={handleSubmit}
            >
              {block.form.fields?.map(renderField)}

              <button
                type="submit"
                disabled={formState.loading}
                className={`bg-primary text-black px-5 rounded-xl py-4 lg:h-min-full cursor-pointer font-unbounded transition ${
                  formState.loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-hover'
                }`}
              >
                {formState.loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  block.form.submitButtonLabel || 'Отправить'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
