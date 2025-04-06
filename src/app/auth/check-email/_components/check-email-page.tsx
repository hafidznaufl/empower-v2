'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '~/app/_components/ui/button'
import { LogIn } from 'lucide-react'

function CheckEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    setEmail(searchParams.get('email'))
    setType(searchParams.get('type'))

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    const timeout = setTimeout(() => {
      router.push('/auth/login')
    }, 60000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [router, searchParams])

  const getMessage = () => {
    if (type === 'verify') {
      return 'We’ve sent a confirmation link to verify your account. Please check your inbox and click the link to verify your account.'
    }
    if (type === 'reset-password') {
      return 'We’ve sent a password reset link. Please follow the instructions to reset your password.'
    }
    return 'Please check your email inbox for further instructions.'
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex max-w-md flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold">Check Your Email</h1>
        <p className="text-muted-foreground">
          {getMessage()} {email && <b>{email}</b>}.
        </p>
        <p className="text-muted-foreground">
          You will be redirected to the login page in <b>{countdown}</b>{' '}
          seconds.
        </p>
        <Button
          onClick={() => router.push('/auth/login')}
          className="mt-2 w-full"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Proceed to Login
        </Button>
      </div>
    </div>
  )
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckEmailContent />
    </Suspense>
  )
}
