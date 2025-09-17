export const APP_LOCALES = ['ru', 'kk', 'en'] as const

export type AppLocale = (typeof APP_LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = 'ru'

const LEGACY_LOCALE_MAP: Record<string, AppLocale> = {
  kz: 'kk',
}

export function resolveLocale(rawLocale?: string | null): AppLocale {
  if (!rawLocale) {
    return DEFAULT_LOCALE
  }

  const normalized = rawLocale.toLowerCase()

  if (LEGACY_LOCALE_MAP[normalized]) {
    return LEGACY_LOCALE_MAP[normalized]
  }

  return (APP_LOCALES.find((locale) => locale === normalized) ?? DEFAULT_LOCALE) as AppLocale
}
