'use client'

import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'

type ModeToggleProps = {
  className?: string
  size?: 'lg' | 'sm' | 'icon' | 'default'
  variants?: 'ghost' | 'secondary' | 'outline' | 'default' | 'link'
}

export function DarkModeToggle({
  className,
  variants = 'outline',
  size = 'default',
}: ModeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Button
      variant={variants}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={className}
      size={size}
    >
      {mounted ? theme === 'light' ? <MoonIcon /> : <SunIcon /> : null}
    </Button>
  )
}
