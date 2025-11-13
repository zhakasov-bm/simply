'use client'

import { useState, useEffect } from 'react'
import { Modal } from './Modal'
import { submitLead } from '@/app/utils/submitLead'

export const ConsultationForm = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  onSubmit: (data: { name: string; email: string; phone: string }) => Promise<void> | void
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Persist form data in localStorage
  useEffect(() => {
    if (!open) return
    const saved = localStorage.getItem('consultation-modal-form')
    if (saved) {
      const { name: savedName, email: savedEmail, phone: savedPhone } = JSON.parse(saved)
      setName(savedName || '')
      setEmail(savedEmail || '')
      setPhone(savedPhone || '')
    }
  }, [open])

  useEffect(() => {
    localStorage.setItem('consultation-modal-form', JSON.stringify({ name, email, phone }))
  }, [name, email, phone])

  const resetForm = () => {
    setName('')
    setEmail('')
    setPhone('')
    localStorage.removeItem('consultation-modal-form')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('idle')
    try {
      await submitLead({
        form: 'consultation-modal',
        data: { name, email, phone },
      })
      await onSubmit({ name, email, phone })
      setStatus('success')
      setTimeout(() => {
        resetForm()
        setStatus('idle')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const fields = [
    { id: 'modal-name', label: 'Имя', value: name, onChange: setName, type: 'text' },
    { id: 'modal-email', label: 'Email', value: email, onChange: setEmail, type: 'email' },
    { id: 'modal-phone', label: 'Телефон', value: phone, onChange: setPhone, type: 'tel' },
  ]

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-unbounded mb-6 text-center">Получить консультацию</h2>
      {status === 'success' && (
        <div className="mb-4 text-green-700 bg-green-100 border border-green-400 rounded-md px-4 py-2 text-center text-sm">
          Спасибо! Заявка успешно отправлена.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-4 text-red-700 bg-red-100 border border-red-400 rounded-md px-4 py-2 text-center text-sm">
          Ошибка при отправке. Попробуйте снова.
        </div>
      )}
      {status !== 'success' && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-inter">
          {fields.map(({ id, label, value, onChange, type }) => (
            <div key={id} className="relative">
              <input
                id={id}
                type={type}
                placeholder=" "
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                className="peer w-full rounded-xl px-3 pt-5 pb-2 bg-[#F3F4F4] text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <label
                htmlFor={id}
                className="absolute left-3 top-2 text-xs text-gray-500 transition-all \
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-lg \
                  peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs"
              >
                {label}
              </label>
            </div>
          ))}
          <button
            type="submit"
            className="bg-primary hover:bg-hover transition text-black font-unbounded text-lg rounded-2xl px-6 py-3"
          >
            Отправить
          </button>
        </form>
      )}
    </Modal>
  )
}
