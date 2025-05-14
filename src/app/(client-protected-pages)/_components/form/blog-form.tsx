'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { useForm } from 'react-hook-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

import * as z from 'zod'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import TextEditor from '~/components/text-editor'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { blogSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSupabaseUpload } from '~/utils/hooks/useSupabaseUpload'
import { api } from '~/trpc/react'
import { useClientUserSession } from '~/utils/hooks/useUserSession'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/app/_components/ui/select'

export default function BlogForm() {
  const router = useRouter()
  const { uploadFile } = useSupabaseUpload()
  const createBlog = api.blog.create.useMutation()

  const session = useClientUserSession()
  const userId = session?.id as string

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      category: undefined,
      thumbnail: '',
      authorId: userId,
    },
  })

  async function onSubmit(data: z.infer<typeof blogSchema>) {
    let thumbnailUrl: string | null = null

    if (data.thumbnail instanceof File) {
      thumbnailUrl = await uploadFile(data.thumbnail, 'blogs', 'thumbnails')

      if (!thumbnailUrl) {
        toast.error('Thumbnails upload failed. Please try again.')
        return
      }
    }

    try {
      await createBlog.mutateAsync({
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category,
        blogStatus: 'DRAFT',
        thumbnail: thumbnailUrl || undefined,
        authorId: userId,
      })

      toast.success('🎉 Blog published!', {
        description:
          'Your blog post has been received and is pending review before publishing.',
        duration: 5000,
      })

      form.reset()
      router.push('/')
    } catch (error: any) {
      console.error('Error creating blog:', error)
      toast.error('Failed to submit blog', {
        description: error?.message || 'Please try again later.',
        duration: 6000,
      })
    }
  }

  return (
    <Card className="mx-4 mb-8 mt-16 rounded-xl md:my-8">
      <CardHeader>
        <CardTitle>Blog Post Editor</CardTitle>
        <CardDescription>
          Craft stories that inspire. Edit, publish, and share your voice with
          the world effortlessly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit(onSubmit)()
            }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a captivating title..."
                      {...field}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormDescription>
                    Give your blog a title that grabs attention and reflects its
                    content.
                  </FormDescription>
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
                    <Textarea
                      placeholder="Summarize your blog in a few sentences..."
                      className="resize-y bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a concise overview of your blog to entice readers to
                    dive in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <TextEditor
                      content={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Share your ideas, stories, or insights. Use headings, lists,
                    and many more utilities to enrich your content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-background">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BLOG">Blog</SelectItem>
                        <SelectItem value="NEWS">News</SelectItem>
                        <SelectItem value="PRESS_RELEASE">
                          Press Release
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Choose your study program to help us categorize your report.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      defaultValue={''}
                      className="bg-background"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          field.onChange(e.target.files[0])
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    If available, please upload an image that represents your
                    content as a thumbnail.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 md:flex-row-reverse">
              <Button
                type="reset"
                variant={'destructive'}
                onClick={() => form.reset()}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Creating...' : 'Create Blog'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
