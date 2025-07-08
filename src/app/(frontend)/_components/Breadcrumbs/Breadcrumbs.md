# Breadcrumbs Component

Компонент для отображения навигационных хлебных крошек на сайте.

## Особенности

- ✅ Автоматическая генерация из URL
- ✅ Поддержка кастомных лейблов
- ✅ SEO микроразметка (Schema.org)
- ✅ Доступность (ARIA)
- ✅ Адаптивный дизайн
- ✅ TypeScript поддержка

## Использование

### Базовое использование

```tsx
import Breadcrumbs from '@/app/(frontend)/_components/Breadcrumbs'

// Автоматическая генерация из URL
<Breadcrumbs />
```

### С кастомными лейблами

```tsx
<Breadcrumbs 
  customLabels={{
    'seo-optimization': 'SEO оптимизация',
    'popolnenie': 'Пополнение баланса'
  }}
/>
```

### Без ссылки на главную

```tsx
<Breadcrumbs showHome={false} />
```

### С кастомными элементами

```tsx
<Breadcrumbs 
  items={[
    { label: 'Главная', href: '/almaty' },
    { label: 'Услуги', href: '/almaty/solution' },
    { label: 'SEO оптимизация', isActive: true }
  ]}
/>
```

### С кастомными стилями

```tsx
<Breadcrumbs className="text-lg font-semibold" />
```

## Пропсы

| Проп | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `items` | `BreadcrumbItem[]` | `undefined` | Кастомные элементы хлебных крошек |
| `className` | `string` | `''` | Дополнительные CSS классы |
| `showHome` | `boolean` | `true` | Показывать ли ссылку на главную |
| `customLabels` | `Record<string, string>` | `{}` | Кастомные лейблы для сегментов URL |

## Интерфейсы

```typescript
interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
  showHome?: boolean
  customLabels?: Record<string, string>
}
```

## SEO

Компонент автоматически генерирует структурированные данные Schema.org:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://example.com/almaty"
    }
  ]
}
```

## Доступность

- Использует семантический тег `<nav>`
- Добавляет `aria-label="Breadcrumb"`
- Использует `aria-current="page"` для активного элемента
- Поддерживает навигацию с клавиатуры

## Примеры URL

Компонент автоматически обрабатывает следующие URL:

- `/almaty` → Главная
- `/almaty/solution` → Главная > Услуги
- `/almaty/solution/seo-optimization` → Главная > Услуги > seo-optimization
- `/case` → Главная > Кейсы
- `/company` → Главная > О компании 