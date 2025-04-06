'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form'

import { getUser, loginAction } from './actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { loginSchema } from './schemas'
import { type z } from 'zod'

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const { success, user, message, redirectTo } = await loginAction(data)

      if (success) {
        const userName = (user?.user_metadata?.name as string) ?? ''
        toast.success('You have successfully signed in!', {
          description: userName
            ? `Welcome back, ${userName}!`
            : 'Welcome back!',
        })

        router.push(redirectTo?.toString() ?? '/')
      } else {
        toast.error('Login Failed', {
          description:
            message ?? 'An error occurred during login. Please try again.',
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Unexpected Error', {
        description: 'Something went wrong. Please try again later.',
      })
    }
  }

  useEffect(() => {
    void getUser()
  }, [])

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to sign in to your account.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/auth/reset-password"
                      className="ml-auto text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeOff className="h-5 w-5" />
                        )}
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
        <Button
          variant={'link'}
          className="w-full md:hidden"
          onClick={() => router.push('/')}
        >
          Back to Home
        </Button>
        <div className="absolute bottom-4 right-1/2 mt-4 w-full translate-x-1/2 text-center text-sm md:hidden">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="underline">
            Register
          </Link>
        </div>
        <div className="hidden text-center text-sm md:flex md:justify-center md:gap-1">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
