'use client'

import { ChangeEvent, useTransition } from 'react'
import { APP_LOCALES, AppLocale } from '@/app/utils/locale'
import { useAppLocale } from '../_components/providers/providers'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

const LABELS: Record<AppLocale, string> = {
  ru: 'RU',
  kk: 'KZ',
  en: 'EN',
}

function setLocaleCookie(locale: AppLocale) {
  document.cookie = `lang=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

export function LanguageSwitcher() {
  const currentLocale = useAppLocale()
  const [isPending, startTransition] = useTransition()

  const handleSelect = (nextLocale: AppLocale) => {
    if (nextLocale === currentLocale) return

    startTransition(() => {
      setLocaleCookie(nextLocale)
      window.location.reload()
    })
  }

  return (
    <div className="relative inline-flex">
      <select
        aria-label="Выбор языка"
        className="appearance-none px-3 py-1 text-xs font-medium uppercase rounded-md border border-inputBG bg-background text-label focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
        value={currentLocale}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          handleSelect(event.target.value as AppLocale)
        }
        disabled={isPending}
      >
        {APP_LOCALES.map((locale) => (
          <option key={locale} value={locale}>
            {LABELS[locale]}
          </option>
        ))}
      </select>
    </div>
  )
}
