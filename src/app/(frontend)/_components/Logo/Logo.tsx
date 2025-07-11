'use client'

import type { Navigation } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export const Logo = ({ nav }: { nav: Navigation }) => {
  const { resolvedTheme } = useTheme()

  const logo =
    resolvedTheme === 'dark'
      ? typeof nav.logoDark === 'object' && nav.logoDark?.url
        ? nav.logoDark
        : nav.logo // fallback
      : nav.logo

  return (
    <Link href="/">
      {typeof logo === 'object' && logo?.url && (
        <Image src={logo.url} alt={logo.alt || ''} width={120} height={50} draggable={false} />
      )}
    </Link>
  )
}
