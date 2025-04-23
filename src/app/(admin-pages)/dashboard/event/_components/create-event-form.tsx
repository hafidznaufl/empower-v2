'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type z } from 'zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { id as IDLocale } from 'date-fns/locale'

import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { cn } from '~/utils/cn'

import { eventSchema } from './schema'
import { useSupabaseUpload } from '~/utils/hooks/useSupabaseUpload'
import { api } from '~/trpc/react'

type EventFormValues = z.infer<typeof eventSchema>

export default function CreateEventForm() {
  const router = useRouter()
  const utils = api.useUtils()
  const { uploadFile } = useSupabaseUpload()
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: undefined,
      timeStart: new Date(),
      timeEnd: new Date(),
      location: '',
      room: '',
      capacity: '',
      thumbnailURL: '',
    },
  })

  const createEvent = api.event.create.useMutation({
    onSuccess: () => {
      toast.success('Event created successfully!')
      utils.event.getAll.invalidate()
      router.push('/dashboard/event')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create event')
    },
  })

  const onSubmit = async (data: EventFormValues) => {
    try {
      let thumbnailURL = data.thumbnailURL

      if (thumbnailFile) {
        const uploadedUrl = await uploadFile(
          thumbnailFile,
          'events',
          'thumbnails',
        )

        if (!uploadedUrl) {
          toast.error('Thumbnail upload failed. Please try again.')
          return
        }

        thumbnailURL = uploadedUrl
      }

      await createEvent.mutateAsync({
        ...data,
        thumbnailURL,
      })
    } catch (err) {
      toast.error('Unexpected error occurred.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Event description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'EEEE, dd MMMM yyyy', {
                          locale: IDLocale,
                        })
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 text-muted-foreground" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="z-50 w-auto p-0" align="start" disablePortal={true}>
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date ?? new Date())}
                    fromYear={1970}
                    toYear={new Date().getFullYear()}
                    defaultMonth={new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeStart"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  value={format(field.value, 'HH:mm')}
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(':')
                    const newDate = new Date(field.value)
                    newDate.setHours(Number(hours))
                    newDate.setMinutes(Number(minutes))
                    field.onChange(newDate)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeEnd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  value={format(field.value, 'HH:mm')}
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(':')
                    const newDate = new Date(field.value)
                    newDate.setHours(Number(hours))
                    newDate.setMinutes(Number(minutes))
                    field.onChange(newDate)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Event location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <FormControl>
                <Input placeholder="Room or hall" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Total capacity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnailURL"
          render={() => {
            const currentPreview = form.watch('thumbnailURL')

            return (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {currentPreview && (
                      <div className="w-48">
                        <Image
                          width={200}
                          height={200}
                          src={
                            currentPreview.startsWith('http')
                              ? currentPreview
                              : process.env
                                  .NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL +
                                currentPreview
                          }
                          alt="Thumbnail Preview"
                          className="rounded-md border object-cover"
                        />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setThumbnailFile(file)
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? 'Creating...' : 'Create Event'}
        </Button>
      </form>
    </Form>
  )
}
