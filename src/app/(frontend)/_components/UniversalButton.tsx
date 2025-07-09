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
    } else if (to?.startsWith('#')) {
      document.querySelector(to)?.scrollIntoView({ behavior: 'smooth' })
    } else if (to) {
      router.push(to)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`w-auto md:min-w-fit px-8 py-4 bg-primary text-black rounded-custom cursor-pointer hover:bg-hover transition ${className || ''}`}
    >
      {label}
    </button>
  )
}
