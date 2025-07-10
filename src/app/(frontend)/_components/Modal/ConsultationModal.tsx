import { useRef, useEffect, useState } from 'react'

export const ConsultationModal = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  onSubmit: (data: { name: string; email: string; phone: string }) => void
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    if (open) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="bg-white rounded-custom p-8 relative w-full max-w-md shadow-lg"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-black">Получить консультацию</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit({ name, email, phone })
          }}
          className="flex flex-col gap-4 text-black"
        >
          <input
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2"
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-primary text-black rounded-2xl px-4 py-2 mt-2 hover:bg-primary/80"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  )
}
