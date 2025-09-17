'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
import { toast } from 'sonner'
import { registerSchema, type RegisterSchema } from './schemas'
import { registerAction } from './actions'
import { env } from '~/env'

export default function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerAction(data)

    const ADMIN_EMAILS = env.ADMIN_EMAILS ? env.ADMIN_EMAILS.split(',') : []

    console.log('ADMIN', ADMIN_EMAILS)

    if (!result.success) {
      toast.error('Registration Failed', {
        description:
          result.message ||
          'An error occurred during sign-up. Please try again.',
      })
      return
    }

    toast.success('You have successfully signed up!', {
      description: result.user?.user_metadata?.full_name
        ? `Welcome, ${result.user.user_metadata.full_name}!`
        : 'Your account has been created successfully.',
    })

    form.reset()
    router.push(
      `/auth/check-email?type=verify&email=${encodeURIComponent(data.email)}`,
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to sign up for a new account.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Name</Label>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input
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
                  <Label>Password</Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
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
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>Confirm Password</Label>
                  <FormControl>
                    <Input type="password" {...field} />
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
              {form.formState.isSubmitting ? 'Registering...' : 'Register'}
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
          Already have an account?{' '}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
        <div className="hidden text-center text-sm md:flex md:justify-center md:gap-1">
          Already have an account?{' '}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
