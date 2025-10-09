import { usePathname } from 'next/navigation'
import { ALLOWED_CITIES } from './cities'
import { AppLocale } from './locale'
import { useCurrentCity } from './useCurrentCity'
import { useAppLocale } from '@/app/(frontend)/_components/providers/providers'

interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface UseBreadcrumbsOptions {
  showHome?: boolean
  customLabels?: Record<string, string>
  items?: BreadcrumbItem[]
}

export function useBreadcrumbs(options: UseBreadcrumbsOptions = {}) {
  const pathname = usePathname()
  const [currentCity] = useCurrentCity()
  const locale = useAppLocale()
  const { showHome = true, customLabels = {}, items } = options

  // Если items переданы, используем их
  if (items) {
    return items
  }

  // Иначе генерируем из pathname
  return generateBreadcrumbsFromPath(pathname, showHome, customLabels, currentCity, locale)
}

const LOCALIZED_SEGMENTS: Record<AppLocale, Record<string, string>> = {
  ru: {
    home: 'Главная',
    solution: 'Услуги',
    case: 'Кейсы',
    company: 'О компании',
    popolnenie: 'Пополнение',
    vacancy: 'Вакансии',
  },
  kk: {
    home: 'Басты бет',
    solution: 'Қызметтер',
    case: 'Кейстер',
    company: 'Компания туралы',
    popolnenie: 'Толықтыру',
    vacancy: 'Вакансиялар',
  },
  en: {
    home: 'Home',
    solution: 'Services',
    case: 'Cases',
    company: 'About us',
    popolnenie: 'Top up',
    vacancy: 'Vacancies',
  },
}

function generateBreadcrumbsFromPath(
  pathname: string,
  showHome: boolean,
  customLabels: Record<string, string>,
  currentCity: string,
  locale: AppLocale,
): BreadcrumbItem[] {
  let segments = pathname.split('/').filter(Boolean)
  // Определяем город только из URL, не из currentCity
  let city = ''
  if (segments.length && ALLOWED_CITIES.includes(segments[0])) {
    city = segments[0]
    segments = segments.slice(1)
  }

  const breadcrumbs: BreadcrumbItem[] = []
  const localeLabels = LOCALIZED_SEGMENTS[locale] || LOCALIZED_SEGMENTS.ru

  // Главная страница
  if (showHome) {
    breadcrumbs.push({
      label: localeLabels.home,
      href: city ? `/${city}` : '/',
    })
  }

  let currentPath = city ? `/${city}` : ''
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    currentPath += `/${segment}`

    // Определяем label для каждого сегмента
    let label = segment
    if (customLabels[segment]) {
      label = customLabels[segment]
    } else {
      label = localeLabels[segment] ?? formatSegment(segment)
    }

    const isLast = i === segments.length - 1
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
      isActive: isLast,
    })
  }

  return breadcrumbs
}

function formatSegment(segment: string) {
  const decoded = decodeURIComponent(segment).replace(/[-_]/g, ' ')
  return decoded.charAt(0).toUpperCase() + decoded.slice(1)
}
