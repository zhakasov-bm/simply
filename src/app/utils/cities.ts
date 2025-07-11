// src/app/utils/cities.ts

export const ALLOWED_CITIES = [
  'almaty',
  'astana',
  'shymkent',
  'aktobe',
  'aktau',
  'atyrau',
  'taraz',
  'talgar',
  'kyzylorda',
  'kostanay',
  'dubai',
  'batumi',
]

export const getCityRegex = () => {
  return new RegExp(`^/(${ALLOWED_CITIES.join('|')})`)
}

export const CITY_RU: Record<string, string> = {
  almaty: 'Алматы',
  astana: 'Астана',
  shymkent: 'Шымкент',
  aktobe: 'Актобе',
  aktau: 'Актау',
  atyrau: 'Атырау',
  taraz: 'Тараз',
  talgar: 'Талгар',
  kyzylorda: 'Кызылорда',
  kostanay: 'Костанай',
  dubai: 'Дубай',
  batumi: 'Батуми',
}

export const CITY_PREPOSITIONAL: Record<string, string> = {
  almaty: 'в Алматы',
  astana: 'в Астане',
  shymkent: 'в Шымкенте',
  aktobe: 'в Актобе',
  aktau: 'в Актау',
  atyrau: 'в Атырау',
  taraz: 'в Таразе',
  talgar: 'в Талгаре',
  kyzylorda: 'в Кызылорде',
  kostanay: 'в Костанае',
  dubai: 'в Дубае',
  batumi: 'в Батуми',
}
