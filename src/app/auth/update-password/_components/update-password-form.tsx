'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { updatePassword } from './actions'
import { updatePasswordSchema } from './schemas'
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
import { Eye, EyeOff } from 'lucide-react'
import { createClient } from '~/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function UpdatePasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const supabaseClient = createClient()
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  })

  const onSubmit = async (data: {
    newPassword: string
    confirmPassword: string
  }) => {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession()

    if (!session?.user) {
      toast.error('You must be logged in to update your password.')
      return
    }

    const userId = session.user.id

    const result = await updatePassword({ ...data, userId })

    if (result.success) {
      toast.success(result.message)
      router.push('/')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <Label>Password</Label>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} {...field} />
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
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </Form>
  )
}
