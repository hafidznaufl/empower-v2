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
import { Input } from '~/components/ui/input'
import { Textarea } from '~/app/_components/ui/textarea'

const blogStatusSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  blogStatus: z.enum(['PENDING', 'PUBLISHED', 'ARCHIVED']),
})

type BlogStatusFormValues = z.infer<typeof blogStatusSchema>

interface UpdateIncidentStatusFormProps {
  id: string
}

export default function UpdateBlogStatusForm({
  id,
}: UpdateIncidentStatusFormProps) {
  const form = useForm<BlogStatusFormValues>({
    resolver: zodResolver(blogStatusSchema),
    defaultValues: {
      id,
      title: '',
      author: '',
      blogStatus: 'PENDING',
    },
  })

  const utils = api.useUtils()

  const { data, isLoading, error } = api.blog.getById.useQuery({ id })

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        title: data.title,
        author: data.author.name,
        blogStatus: data.blogStatus,
      })
    }
  }, [data, form])

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch incident data.')
    }
  }, [error])

  const updateMutation = api.blog.update.useMutation({
    onSuccess() {
      toast.success('Incident status updated successfully.')
      utils.blog.getAll.invalidate()
    },
    onError() {
      toast.error('Failed to update incident status.')
    },
  })

  const onSubmit = (values: BlogStatusFormValues) => {
    updateMutation.mutate({
      id: values.id,
      blogStatus: values.blogStatus,
    })
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input {...field} type="text" disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="blogStatus"
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
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
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
