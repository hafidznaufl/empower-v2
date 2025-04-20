'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type z } from 'zod'
import { format } from 'date-fns'
import { CalendarIcon, MapPin, Info } from 'lucide-react'
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
import { Switch } from '~/components/ui/switch'
import { cn } from '~/utils/cn'
import { id as IDLocale } from 'date-fns/locale'
import { api } from '~/trpc/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { eventSchema } from './schema'

type EventFormValues = z.infer<typeof eventSchema>

export default function CreateEventForm() {
  const router = useRouter()
  const utils = api.useUtils()

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      startDate: new Date(),
      endDate: new Date(),
      isPublic: true,
    },
  })

  const createEvent = api.event.create.useMutation({
    onSuccess: () => {
      toast.success('Event created successfully!')
      router.push('/dashboard/event')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create event')
    },
  })

  const onSubmit = async (data: EventFormValues) => {
    try {
      await createEvent.mutateAsync({
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      })
      await utils.event.getAll.invalidate()
    } catch (error) {
      toast.error('Unexpected error occurred')
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
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter event name" {...field} />
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
                <Input placeholder="Short description (optional)" {...field} />
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
                <div className="relative flex items-center">
                  <Input placeholder="Event location" {...field} />
                  <MapPin className="absolute right-4 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {['startDate', 'endDate'].map((fieldKey) => (
          <FormField
            key={fieldKey}
            control={form.control}
            name={fieldKey as 'startDate' | 'endDate'}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  {fieldKey === 'startDate' ? 'Start Date' : 'End Date'}
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
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
                          <span>Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 text-muted-foreground" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => field.onChange(date ?? new Date())}
                      fromYear={2000}
                      toYear={2030}
                      defaultMonth={new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-1">
                <FormLabel>Public Event</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
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
