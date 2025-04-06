'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { editProfileSchema } from './schemas'
import { useClientUserSession } from '~/utils/hooks/useUserSession'
import { type z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { format } from 'date-fns'
import { cn } from '~/utils/cn'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '~/components/ui/calendar'
import { useEffect } from 'react'
import { api } from '~/trpc/react'
import { id } from 'date-fns/locale'

export default function EditProfileForm() {
  const router = useRouter()
  const session = useClientUserSession()

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      userId: session?.id.toString() ?? '',
      nik: '',
      name: '',
      birthDate: undefined,
      gender: undefined,
      phone: '',
    },
  })

  useEffect(() => {
    if (session) {
      form.reset({
        userId: session.id.toString(),
        nik: '',
        name: '',
        birthDate: undefined,
        gender: undefined,
        phone: '',
      })
    }
  }, [session, form])

  const updateProfile = api.profile.createOrUpdate.useMutation()

  const onSubmit = async (data: z.infer<typeof editProfileSchema>) => {
    console.log('Submitted data:', data)
    try {
      const result = await updateProfile.mutateAsync(data)
      if (!result) throw new Error('Invalid response from server')

      toast.success('Profile updated successfully!')
      router.push('/profile')
    } catch (error) {
      console.error('Failed to update profile:', error)
      toast.error(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  return (
    <div className="container mx-auto my-8 space-y-6 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile details below</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                name="nik"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>NIK</Label>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Name</Label>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="birthDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? format(
                                  new Date(field.value),
                                  'eeee, dd MMMM yyyy',
                                  { locale: id },
                                )
                              : 'Pick a date'}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          fromYear={1970}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ''}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Phone</Label>
                    <FormControl>
                      <Input type="text" {...field} />
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
                {form.formState.isSubmitting ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
