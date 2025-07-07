import { usePathname } from 'next/navigation'
import { ALLOWED_CITIES } from './cities'
import { useCurrentCity } from './useCurrentCity'

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
  const { showHome = true, customLabels = {}, items } = options

  // Если items переданы, используем их
  if (items) {
    return items
  }

  // Иначе генерируем из pathname
  return generateBreadcrumbsFromPath(pathname, showHome, customLabels, currentCity)
}

function generateBreadcrumbsFromPath(
  pathname: string,
  showHome: boolean,
  customLabels: Record<string, string>,
  currentCity: string,
): BreadcrumbItem[] {
  let segments = pathname.split('/').filter(Boolean)
  // Определяем город только из URL, не из currentCity
  let city = ''
  if (segments.length && ALLOWED_CITIES.includes(segments[0])) {
    city = segments[0]
    segments = segments.slice(1)
  }

  const breadcrumbs: BreadcrumbItem[] = []

  // Главная страница
  if (showHome) {
    breadcrumbs.push({
      label: 'Главная',
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
      switch (segment) {
        case 'solution':
          label = 'Услуги'
          break
        case 'case':
          label = 'Кейсы'
          break
        case 'company':
          label = 'О компании'
          break
        case 'popolnenie':
          label = 'Пополнение'
          break
        default:
          break
      }
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
