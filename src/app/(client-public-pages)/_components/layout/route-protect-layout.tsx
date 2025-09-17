'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export default function RouteProtectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const message = searchParams.get('message')

    if (message === 'login-required') {
      toast.warning('Please log in to continue.', {
        description: 'You must be logged in to access this page.',
      })
    }

    if (message === 'not-admin') {
      toast.error('Access denied.', {
        description: 'You need admin privileges to access this page.',
      })
    }

    if (message === 'already-logged-in') {
      toast.info('You’re already logged in.', {
        description: 'Redirected to the homepage.',
      })
    }
  }, [searchParams])

  return <>{children}</>
}
