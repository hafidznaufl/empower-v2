'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateEmailSchema } from './schemas'
import { updateEmail } from './actions'
import { useClientUserSession } from '~/utils/hooks/useUserSession'
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

export default function UpdateEmailForm() {
  const router = useRouter()
  const session = useClientUserSession()

  const form = useForm({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: { email: string }) => {
    if (!session?.id) {
      toast.error('User not found')
      return
    }

    const result = await updateEmail(session.id, data.email)

    if (result.success) {
      toast.success('Email updated! Check your inbox for confirmation.')
      router.push('/profile')
    } else {
      toast.error(result.error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>New Email</Label>
              <FormControl>
                <Input type="email" {...field} />
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
          {form.formState.isSubmitting ? 'Updating...' : 'Update Email'}
        </Button>
      </form>
    </Form>
  )
}
