// src/app/(frontend)/[...notFound]/page.tsx
import { notFound } from 'next/navigation'

export const metadata = {
  title: { absolute: '404 — Страница не найдена' },
  description: 'Страница не найдена',
}

export default function CatchAllNotFoundPage() {
  notFound()
}
