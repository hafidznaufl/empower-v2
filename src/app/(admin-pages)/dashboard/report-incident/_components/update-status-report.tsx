'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Button } from '~/components/ui/button'
import { api } from '~/trpc/react'

const incidentStatusSchema = z.object({
  id: z.string(),
  reportStatus: z.enum([
    'PENDING',
    'IN_PROCESS',
    'PROVEN_LIGHTLY_SANCTIONED',
    'PROVEN_MODERATElYY_SANCTIONED',
    'PROVEN_SEVERELY_SANCTIONED',
    'SOLVED',
    'NOT_PROVEN',
    'NOT_SANCTIONED',
  ]),
})

type IncidentStatusFormValues = z.infer<typeof incidentStatusSchema>

interface UpdateIncidentStatusFormProps {
  id: string
}

export default function UpdateIncidentStatusForm({
  id,
}: UpdateIncidentStatusFormProps) {
  const form = useForm<IncidentStatusFormValues>({
    resolver: zodResolver(incidentStatusSchema),
    defaultValues: {
      id,
      reportStatus: 'PENDING',
    },
  })

  const utils = api.useUtils()

  const { data, isLoading, error } = api.report.getById.useQuery({ id })

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        reportStatus: data.reportStatus,
      })
    }
  }, [data, form])

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch incident data.')
    }
  }, [error])

  const updateMutation = api.report.update.useMutation({
    onSuccess() {
      toast.success('Incident status updated successfully.')
      utils.report.getAll.invalidate()
    },
    onError() {
      toast.error('Failed to update incident status.')
    },
  })

  const onSubmit = (values: IncidentStatusFormValues) => {
    updateMutation.mutate({
      id: values.id,
      reportStatus: values.reportStatus,
    })
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="reportStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="PROVEN_LIGHTLY_SANCTIONED">
                    Proven - Lightly Sanctioned
                  </SelectItem>
                  <SelectItem value="PROVEN_MODERATELY_SANCTIONED">
                    Proven - Moderately Sanctioned
                  </SelectItem>
                  <SelectItem value="PROVEN_SEVERELY_SANCTIONED">
                    Proven - Severely Sanctioned
                  </SelectItem>
                  <SelectItem value="SOLVED">Solved</SelectItem>
                  <SelectItem value="NOT_PROVEN">Not Proven</SelectItem>
                  <SelectItem value="NOT_SANCTIONED">Not Sanctioned</SelectItem>
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
          {form.formState.isSubmitting
            ? 'Updating...'
            : 'Update Incident Status'}
        </Button>
      </form>
    </Form>
  )
}
