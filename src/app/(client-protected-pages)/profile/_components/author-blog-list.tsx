'use client'

import { Skeleton } from '~/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { api } from '~/trpc/react'

type AuthorBlogListProps = {
  authorId: string
}

export function AuthorBlogList({ authorId }: AuthorBlogListProps) {
  const { data: blogs, isLoading } = api.blog.getByAuthorId.useQuery({
    authorId,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    )
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        You haven't created any blogs yet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <Card key={blog.id}>
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{blog.description}</p>
            <p className="mt-2 text-xs text-gray-500">
              Status: {blog.blogStatus} | Category: {blog.category}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
