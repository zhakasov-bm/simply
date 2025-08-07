// src/app/(frontend)/[...notFound]/page.tsx
import { notFound } from 'next/navigation'

export default function CatchAllNotFoundPage() {
  notFound()
}
