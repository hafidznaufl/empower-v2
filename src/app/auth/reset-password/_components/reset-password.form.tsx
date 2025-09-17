'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPassword } from './actions'
import { resetPasswordSchema } from './schemas'
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
import { useRouter } from 'next/navigation'

export default function ResetPasswordForm() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: { email: string }) => {
    const result = await resetPassword(data)

    if (result.success) {
      toast.success('Password Reset Requested!', {
        description:
          'Check your email for the reset link to update your password.',
      })
      router.push(
        `/auth/check-email?type=reset-password&email=${encodeURIComponent(data.email)}`,
      )
    } else {
      toast.error('Password Reset Failed', {
        description:
          result.message ??
          'We couldn’t reset your password. Please check the reset link or try again later.',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </Form>
  )
}
