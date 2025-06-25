import type { Navigation } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export const Logo = ({ nav }: { nav: Navigation }) => {
  return (
    <Link href="/">
      {typeof nav.logo === 'object' && nav.logo.url && (
        <Image
          src={nav.logo.url}
          alt={nav.logo.alt || ''}
          width={120}
          height={50}
          draggable={false}
        />
      )}
    </Link>
  )
}
