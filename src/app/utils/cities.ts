import { AppLocale } from './locale'

type CityInfo = {
  ru: string
  kk: string
  en: string
  prepositional: {
    ru: string
    kk: string
    en: string
  }
}

export const CITIES: Record<string, CityInfo> = {
  default: {
    ru: '',
    kk: '',
    en: '',
    prepositional: {
      ru: '',
      kk: '',
      en: '',
    },
  },
  almaty: {
    ru: 'Алматы',
    kk: 'Алматы',
    en: 'Almaty',
    prepositional: {
      ru: 'в Алматы',
      kk: 'Алматы',
      en: 'in Almaty',
    },
  },
  astana: {
    ru: 'Астана',
    kk: 'Астана',
    en: 'Astana',
    prepositional: {
      ru: 'в Астане',
      kk: 'Астана',
      en: 'in Astana',
    },
  },
  shymkent: {
    ru: 'Шымкент',
    kk: 'Шымкент',
    en: 'Shymkent',
    prepositional: {
      ru: 'в Шымкенте',
      kk: 'Шымкент',
      en: 'in Shymkent',
    },
  },
  aktobe: {
    ru: 'Актобе',
    kk: 'Ақтөбе',
    en: 'Aktobe',
    prepositional: {
      ru: 'в Актобе',
      kk: 'Ақтөбе',
      en: 'in Aktobe',
    },
  },
  aktau: {
    ru: 'Актау',
    kk: 'Ақтау',
    en: 'Aktau',
    prepositional: {
      ru: 'в Актау',
      kk: 'Ақтау',
      en: 'in Aktau',
    },
  },
  atyrau: {
    ru: 'Атырау',
    kk: 'Атырау',
    en: 'Atyrau',
    prepositional: {
      ru: 'в Атырау',
      kk: 'Атырау',
      en: 'in Atyrau',
    },
  },
  taraz: {
    ru: 'Тараз',
    kk: 'Тараз',
    en: 'Taraz',
    prepositional: {
      ru: 'в Таразе',
      kk: 'Тараз',
      en: 'in Taraz',
    },
  },
  talgar: {
    ru: 'Талгар',
    kk: 'Талғар',
    en: 'Talgar',
    prepositional: {
      ru: 'в Талгаре',
      kk: 'Талғар',
      en: 'in Talgar',
    },
  },
  kyzylorda: {
    ru: 'Кызылорда',
    kk: 'Қызылорда',
    en: 'Kyzylorda',
    prepositional: {
      ru: 'в Кызылорде',
      kk: 'Қызылорда',
      en: 'in Kyzylorda',
    },
  },
  kostanay: {
    ru: 'Костанай',
    kk: 'Қостанай',
    en: 'Kostanay',
    prepositional: {
      ru: 'в Костанае',
      kk: 'Қостанай',
      en: 'in Kostanay',
    },
  },
  dubai: {
    ru: 'Дубай',
    kk: 'Дубай',
    en: 'Dubai',
    prepositional: {
      ru: 'в Дубае',
      kk: 'Дубай',
      en: 'in Dubai',
    },
  },
  batumi: {
    ru: 'Батуми',
    kk: 'Батуми',
    en: 'Batumi',
    prepositional: {
      ru: 'в Батуми',
      kk: 'Батуми',
      en: 'in Batumi',
    },
  },
}

export const ALLOWED_CITIES = Object.keys(CITIES)

function getCityInfo(city: string): CityInfo {
  return CITIES[city] ?? CITIES.default
}

export function getCityLabel(city: string, locale: AppLocale): string {
  const info = getCityInfo(city)
  return info[locale] || info.ru
}

export function getCityPrepositionalLabel(city: string, locale: AppLocale): string {
  const info = getCityInfo(city)
  return info.prepositional[locale] || info.prepositional.ru
}

export const getCityRegex = () => {
  return new RegExp(`^/(${ALLOWED_CITIES.join('|')})`)
}
