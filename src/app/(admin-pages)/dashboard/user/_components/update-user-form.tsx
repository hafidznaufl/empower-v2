/* eslint-disable */
'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { userSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { getUserByIdAction, updateUserRoleAction } from './actions'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { formatName } from '~/utils/hooks/useFormat'
import { toast } from 'sonner'
import { useClientSession } from '~/utils/hooks/useSession'

type UserFormValues = z.infer<typeof userSchema>

interface UpdateUserFormProps {
  id: string
}

export default function UpdateUserForm({ id }: UpdateUserFormProps) {
  const session = useClientSession()
  const userId = session?.user.id

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: '',
      name: '',
      email: '',
      role: undefined,
    },
  })

  useEffect(() => {
    const getUserById = async () => {
      const result = await getUserByIdAction(id)

      if (result.success && result.user) {
        const userData: UserFormValues = {
          id: result.user.user.id,
          name: result.user.user.user_metadata?.name ?? '',
          email: result.user.user.email ?? '',
          role: result.user.user.user_metadata?.role ?? 'CLIENT',
        }

        form.reset(userData)
      } else {
        console.error(result.message)
      }
    }

    void getUserById()
  }, [id, form])

  const onSubmit = async (values: UserFormValues) => {
    try {
      if (userId === id) {
        toast.warning("You can't change your own role.")
        return
      }

      const result = await updateUserRoleAction(id, values.role)

      if (result.success) {
        toast.success(`Role successfully updated to ${values.role}`)
      } else {
        toast.error(`Failed to update role: ${result.message}`)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input value={field.value} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input value={field.value} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        field.value ? formatName(field.value) : 'Choose Role'
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CLIENT">Client</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? 'Updating...' : 'Update Role User'}
        </Button>
      </form>
    </Form>
  )
}
