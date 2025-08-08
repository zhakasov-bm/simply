import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ALLOWED_CITIES } from './cities'

export function useCurrentCity() {
  const pathname = usePathname()
  const [currentCity, setCurrentCity] = useState(() => {
    const cityFromPath = ALLOWED_CITIES.find((city) => pathname.startsWith(`/${city}`))
    if (cityFromPath) return cityFromPath
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedCity')
      if (stored && ALLOWED_CITIES.includes(stored)) return stored
    }
    return 'default'
  })

  useEffect(() => {
    const cityFromPath = ALLOWED_CITIES.find((city) => pathname.startsWith(`/${city}`))
    if (cityFromPath && cityFromPath !== currentCity) {
      setCurrentCity(cityFromPath)
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedCity', cityFromPath)
      }
    } else if (!cityFromPath && typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedCity')
      if (stored && stored !== currentCity && ALLOWED_CITIES.includes(stored)) {
        setCurrentCity(stored)
      } else {
        setCurrentCity('default')
      }
    }
  }, [pathname])

  return [currentCity, setCurrentCity] as const
}
