'use client'

import { Component } from '@/payload-types'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import SuccessModal from './Modal/SuccessModal'
import { submitLead } from '@/app/utils/submitLead'
import FormBuilder from './FormBuilder'

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

  const [phone, setPhone] = useState('')

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    if (formState.success) {
      setShowSuccessModal(true)
    }
  }, [formState.success])

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
        form: block.form?.title || 'request-form',
        data,
      })

      setFormState({ loading: false, error: null, success: true })
      setPhone('+7 ') // reset phone input
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

  return (
    <section id="contact" className="hidden lg:block md:container md:mx-auto md:py-24 md:px-16">
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
        <div className="flex flex-col gap-5 w-1/2 pt-40 pl-40 text-black">
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
              <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
                {block.form?.confirmationMessage ? (
                  <RichText data={block.form.confirmationMessage} />
                ) : (
                  <p>Форма сәтті жіберілді!</p>
                )}
              </SuccessModal>
              <FormBuilder
                form={block.form}
                phone={phone}
                setPhone={setPhone}
                onSubmit={handleSubmit}
                error={formState.error ?? undefined}
                submitButtonLabel={block?.form?.submitButtonLabel || 'Отправить'}
                classNames={{
                  wrapper: 'flex flex-col gap-3 items-stretch font-inter',
                  input:
                    'peer w-full rounded-2xl px-4 pt-5 pb-2 text-black bg-white text-lg focus:outline-none focus:ring-2 focus:ring-gray-500',
                  button:
                    'w-full bg-black text-white px-5 h-[56px] rounded-2xl cursor-pointer font-unbounded hover:text-hover transition',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
