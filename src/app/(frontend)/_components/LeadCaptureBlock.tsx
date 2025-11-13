'use client'

import { submitLead } from '@/app/utils/submitLead'
import { Component, Solution, Form } from '@/payload-types'
import { useState, useEffect, useMemo } from 'react'
import PhoneInput from 'react-phone-input-2'

type LeadCaptureProps = Extract<Component['globals'][0], { blockType: 'form' }>
type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

type Props = {
  block: LeadCaptureProps
  formId: string
}

export default function LeadCaptureBlock({ block, formId }: Props) {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  })
  const [solutions, setSolutions] = useState<Solution[]>([])

  useEffect(() => {
    fetch('/api/solutions')
      .then((res) => (res.ok ? res.json() : Promise.reject('Ошибка при получении решений')))
      .then((data) => setSolutions(data.docs || []))
      .catch((err) => console.error(err))
  }, [])

  const availableServices = useMemo(() => {
    const categories: Record<string, string> = {
      content: 'Креатив и Контент',
      pr: 'Продвижение и PR',
      brand: 'Стратегия и Бренд',
      website: 'Сайты и Технологии',
    }

    return solutions
      .filter((s) => !s.maintenance)
      .map((s) => ({
        value: s.slug,
        label: s.name,
        category: categories[s.category || ''] || 'Другое',
      }))
  }, [solutions])

  const [phone, setPhone] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!block.form || typeof block.form !== 'object') {
      return setFormState({ loading: false, error: 'Неверная конфигурация формы', success: false })
    }

    setFormState({ loading: true, error: null, success: false })

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      formData.set('phone', phone)
      const data = Object.fromEntries(formData.entries()) as Record<string, string>

      // Phone validation
      const phoneValue = data.phone || ''
      const phoneRegex = /^\+?\d{10,15}$/
      if (!phoneRegex.test(phoneValue)) {
        setFormState({ loading: false, error: 'Некорректный номер телефона', success: false })
        return
      }

      await submitLead({
        form: block.form?.title || 'lead-capture-form',
        data,
      })

      setFormState({ loading: false, error: null, success: true })
      setPhone('') // reset phone input
      ;(e.target as HTMLFormElement).reset()
      setTimeout(() => {
        setFormState({ loading: false, error: null, success: false })
      }, 3000)
    } catch (err) {
      console.error(err)
      setFormState({
        loading: false,
        error: err instanceof Error ? err.message : 'Ошибка отправки формы',
        success: false,
      })
    }
  }

  const renderField = (field: NonNullable<Form['fields']>[0], index: number) => {
    // Skip message fields as they don't have name, required, or label properties
    if (field.blockType === 'message') {
      return null
    }

    const name = field.name || `field-${index}`
    const inputId = `${formId}-${name}-${index}` // 👈 Уникальный ID
    const lowerName = name.toLowerCase()
    const isCategory = ['category', 'услуга', 'service'].some((w) => lowerName.includes(w))

    return (
      <div key={inputId} className="relative flex-1 min-w-[180px]">
        {isCategory ? (
          <>
            <select
              id={inputId}
              name={name}
              required={field.required ?? undefined}
              className="peer w-full rounded-lg px-3 pt-5 pb-2 bg-inputBG text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 appearance-none cursor-pointer"
            >
              <option value="">Выберите услугу</option>
              {availableServices.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
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
          </>
        ) : field.name === 'phone' ? (
          <PhoneInput
            country={'kz'}
            inputProps={{
              required: field.required,
              placeholder: '+7 ',
              className:
                'peer w-full rounded-lg px-3 pt-5 pb-2 bg-inputBG text-lg focus:outline-none focus:ring-2 focus:ring-gray-500',
            }}
            value={phone}
            onChange={setPhone}
          />
        ) : (
          <input
            id={inputId}
            type={field.blockType === 'email' ? 'email' : 'text'}
            name={name}
            required={field.required ?? undefined}
            placeholder=" "
            className="peer w-full rounded-lg px-3 pt-5 pb-2 bg-inputBG text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        )}
        <label
          htmlFor={inputId}
          className="absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs cursor-text"
        >
          {field.label || 'Поле'}
        </label>
      </div>
    )
  }

  const showForm = typeof block?.form === 'object' && block?.form?.title === 'leadCaptureForm'

  return (
    <section className="container mx-auto my-16 lg:my-20 px-6 lg:px-40">
      <div className="bg-background rounded-custom">
        {showForm && (
          <div className="flex flex-col gap-6 py-10 px-4 md:px-12">
            <h3 className="text-xl md:text-2xl md:px-16 leadForm text-center">{block.heading}</h3>

            {formState.success && (
              <p className="bg-green-100 border border-green-500 text-green-500 px-4 py-3 rounded-custom text-center">
                Спасибо! Ваша заявка успешно отправлена.
              </p>
            )}

            {formState.error && (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
                {formState.error}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col lg:flex-row gap-2 items-stretch font-inter"
            >
              {typeof block.form === 'object' &&
                block.form.fields?.map((field, i) => renderField(field, i))}

              <button
                type="submit"
                disabled={formState.loading}
                className={`bg-primary text-black px-5 rounded-xl py-4 lg:h-min-full font-unbounded transition ${
                  formState.loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-hover'
                }`}
              >
                {formState.loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  (typeof block.form === 'object' ? block.form.submitButtonLabel : null) ||
                  'Отправить'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
