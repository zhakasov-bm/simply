'use client'

import { useRef, useEffect } from 'react'
import clsx from 'clsx'

export const Modal = ({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}) => {
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={clsx(
          'bg-white text-black rounded-custom p-6 md:p-8 w-full max-w-md relative shadow-2xl transform transition-all duration-300 ease-in-out scale-100 animate-fadeInUp',
          className,
        )}
      >
        <button
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
