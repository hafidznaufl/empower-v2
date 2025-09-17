'use client'

import { useEffect, useState, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { format } from 'date-fns'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { api } from '~/trpc/react'
import { eventSchema } from './schema'
import UpdateFormSkeleton from '~/app/_components/skeletons/update-form-skeleton'
import Image from 'next/image'
import { useSupabaseUpload } from '~/utils/hooks/useSupabaseUpload'
import TimePopover from '~/app/_components/ui/time-popover'
import { useForm, useWatch } from 'react-hook-form'
import { useCalendarAccordion } from '~/utils/hooks/useCalendarAccordion'
import { env } from '~/env'

type EventFormValues = z.infer<typeof eventSchema>

interface UpdateEventFormProps {
  id: string
}

export default function UpdateEventForm({ id }: UpdateEventFormProps) {
  const router = useRouter()
  const utils = api.useUtils()
  const { uploadFile } = useSupabaseUpload()
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const { data: eventData, isLoading } = api.event.getById.useQuery({ id })

  const updateEvent = api.event.update.useMutation({
    onSuccess: () => {
      toast.success('Event updated successfully!')
      void utils.event.getAll.invalidate()
      router.push('/dashboard/event')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update event')
    },
  })

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      id,
      title: '',
      description: '',
      date: new Date(),
      timeStart: new Date(),
      timeEnd: new Date(),
      location: '',
      room: '',
      capacity: '',
      thumbnailURL: '',
    },
  })

  const calendar = useCalendarAccordion({
    initialDate: form.watch('date') ?? new Date(),
    fromYear: 1970,
    toYear: new Date().getFullYear() + 2,
    onSelect: (date) => form.setValue('date', date),
  })

  const isFormReady = useRef(false)

  useEffect(() => {
    if (eventData && !isFormReady.current) {
      form.reset({
        ...eventData,
        date: new Date(eventData.date),
        timeStart: new Date(eventData.timeStart),
        timeEnd: new Date(eventData.timeEnd),
        thumbnailURL: eventData.thumbnailURL ?? '',
        deletedAt: eventData.deletedAt ?? undefined,
      })
      isFormReady.current = true
    }
  }, [eventData, form])

  const currentPreview = useWatch({
    control: form.control,
    name: 'thumbnailURL',
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

      await updateEvent.mutateAsync({
        ...data,
        id,
        thumbnailURL,
      })
    } catch (err) {
      toast.error('Unexpected error occurred.', {
        description: err instanceof Error ? err.message : undefined,
      })
    }
  }

  if (isLoading) {
    return <UpdateFormSkeleton />
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
                <Input id="title" placeholder="Event title" {...field} />
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
                <Input
                  id="description"
                  placeholder="Event description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <div className="w-full">
                  {calendar.withAccordion(
                    field.value
                      ? format(field.value, 'EEEE, dd MMMM yyyy')
                      : 'Pick a date',
                  )}
                </div>
              </FormControl>
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
                <TimePopover value={field.value} onChange={field.onChange} />
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
                <TimePopover value={field.value} onChange={field.onChange} />
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
                <Input id="location" placeholder="Event location" {...field} />
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
                <Input id="room" placeholder="Room or hall" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Capacity */}
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Total capacity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Thumbnail */}
        <FormField
          control={form.control}
          name="thumbnailURL"
          render={() => (
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
                            : env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL +
                              currentPreview
                        }
                        alt="Thumbnail Preview"
                        className="rounded-md border object-cover"
                      />
                    </div>
                  )}
                  <Input
                    id="thumbnailURL"
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
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? 'Updating...' : 'Update Event'}
        </Button>
      </form>
    </Form>
  )
}
