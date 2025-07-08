'use client'

import { FiSun } from 'react-icons/fi'
import { FiMoon } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

export default function ThemeSwitch() {
  const [mounted, setMoounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMoounted(true), [])

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    )

  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className="cursor-pointer"
    >
      {resolvedTheme === 'dark' ? (
        <FiMoon className="text-xl" onClick={() => setTheme('light')} />
      ) : (
        <FiSun className="text-xl" onClick={() => setTheme('dark')} />
      )}
    </motion.div>
  )
}
