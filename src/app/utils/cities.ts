type CityInfo = {
  ru: string
  prepositional: string
}

export const CITIES: Record<string, CityInfo> = {
  default: { ru: '', prepositional: '' },
  almaty: { ru: 'Алматы', prepositional: 'в Алматы' },
  astana: { ru: 'Астана', prepositional: 'в Астане' },
  shymkent: { ru: 'Шымкент', prepositional: 'в Шымкенте' },
  aktobe: { ru: 'Актобе', prepositional: 'в Актобе' },
  aktau: { ru: 'Актау', prepositional: 'в Актау' },
  atyrau: { ru: 'Атырау', prepositional: 'в Атырау' },
  taraz: { ru: 'Тараз', prepositional: 'в Таразе' },
  talgar: { ru: 'Талгар', prepositional: 'в Талгаре' },
  kyzylorda: { ru: 'Кызылорда', prepositional: 'в Кызылорде' },
  kostanay: { ru: 'Костанай', prepositional: 'в Костанае' },
  dubai: { ru: 'Дубай', prepositional: 'в Дубае' },
  batumi: { ru: 'Батуми', prepositional: 'в Батуми' },
}

export const ALLOWED_CITIES = Object.keys(CITIES)

export const CITY_RU = Object.fromEntries(
  Object.entries(CITIES).map(([key, value]) => [key, value.ru]),
)

export const CITY_PREPOSITIONAL = Object.fromEntries(
  Object.entries(CITIES).map(([key, value]) => [key, value.prepositional]),
)

export const getCityRegex = () => {
  return new RegExp(`^/(${ALLOWED_CITIES.join('|')})`)
}
