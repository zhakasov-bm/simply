'use client'

import { useRouter } from 'next/navigation'

type UniversalButtonProps = {
  label: string
  to?: string
  className?: string
  onClick?: () => void
}

export default function UniversalButton({ label, to, className, onClick }: UniversalButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (to) {
      router.push(to)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`min-w-fit px-10 py-4 bg-primary rounded-2xl cursor-pointer hover:bg-hover transition ${className || ''}`}
    >
      {label}
    </button>
  )
}
