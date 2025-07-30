'use client'

import { ReactNode } from 'react'
import { X } from 'lucide-react'

type Props = {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
}

export default function SuccessModal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md text-center relative">
        <div className="flex justify-end items-end mb-4">
          <X onClick={onClose} size={28} className="cursor-pointer" />
        </div>
        <div className="text-green-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-green-500">Успешная отправка!</h2>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  )
}
