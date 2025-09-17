'use client'

import { createContext, useContext } from 'react'
import { ThemeProvider } from 'next-themes'
import { AppLocale, DEFAULT_LOCALE } from '@/app/utils/locale'

const LocaleContext = createContext<AppLocale>(DEFAULT_LOCALE)

export function useAppLocale() {
  return useContext(LocaleContext)
}

interface ProvidersProps {
  children: React.ReactNode
  locale: AppLocale
}

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <LocaleContext.Provider value={locale}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </LocaleContext.Provider>
  )
}
