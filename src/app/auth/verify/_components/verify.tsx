'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '~/utils/supabase/client'
import { VerifyingFallback } from '~/app/_components/skeletons/suspense-fallback'

export default function VerifyPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const verify = async () => {
      const hash = window.location.hash
      if (!hash) {
        toast.error('Verification token not found.')
        return router.replace('/auth/login')
      }

      const params = new URLSearchParams(hash.slice(1))
      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')

      if (!access_token || !refresh_token) {
        toast.error('Invalid verification token.')
        return router.replace('/auth/login')
      }

      const { error: sessionError } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      })

      if (sessionError) {
        toast.error('Failed to set session.')
        return router.replace('/auth/login')
      }

      const {
        data: { session },
        error: sessionFetchError,
      } = await supabase.auth.getSession()

      if (sessionFetchError || !session?.user) {
        toast.error('Failed to fetch session.')
        return router.replace('/auth/login')
      }

      const user = session.user
      const email = user.email?.toLowerCase().trim() ?? ''
      const userName = (user.user_metadata?.name as string) ?? ''
      const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS
        ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').map((e) =>
            e.trim().toLowerCase(),
          )
        : []

      const role = ADMIN_EMAILS.includes(email) ? 'ADMIN' : 'CUSTOMER'

      toast.success('You have successfully signed in!', {
        description: userName
          ? `Welcome back, ${userName}!`
          : role === 'ADMIN'
            ? 'Welcome, Admin!'
            : 'Welcome back!',
      })

      router.replace(role === 'ADMIN' ? '/dashboard' : '/')
    }

    void verify()
  }, [router, supabase])

  return <VerifyingFallback />
}
