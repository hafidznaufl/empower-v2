'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Edit,
  Eye,
  Filter,
  Megaphone,
  Newspaper,
  PenLine,
  RefreshCw,
  Search,
  Tag,
} from 'lucide-react'
import { Skeleton } from '~/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { api } from '~/trpc/react'
import { formatReadableDate, formatTitleCase } from '~/utils/hooks/useFormat'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

type AuthorBlogListProps = {
  authorId: string
}

export function AuthorBlogList({ authorId }: AuthorBlogListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')

  const { data: blogs, isLoading } = api.blog.getByAuthorId.useQuery({
    authorId,
  })

  const filteredBlogs = blogs?.filter((blog) => {
    const matchesSearch =
      searchQuery === '' ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      categoryFilter === '' || blog.category === categoryFilter

    const matchesStatus =
      statusFilter === '' || blog.blogStatus === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = blogs
    ? [...new Set(blogs.map((blog) => blog.category))]
    : []

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-800 hover:bg-green-200'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
      case 'archived':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      default:
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <div className="rounded-full bg-primary/10 p-3">
          <Tag className="h-10 w-10 text-primary" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No blogs found</h3>
        <p className="mt-2 text-muted-foreground">
          You haven't created any blogs yet. Start writing your first blog post.
        </p>
        <Button className="mt-6">Create your first blog</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search blogs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <Select
              value={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {formatTitleCase(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs?.map((blog) => (
          <Card
            key={blog.id}
            className="group h-full overflow-hidden border bg-card shadow-none transition-all duration-300"
          >
            {blog.thumbnailURL && (
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  fill
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL}${blog.thumbnailURL}`}
                  alt={blog.title}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute right-2 top-2">
                  <Badge className={getStatusColor(blog.blogStatus)}>
                    {blog.blogStatus}
                  </Badge>
                </div>
              </div>
            )}

            <CardHeader className="pb-2">
              <Link href={`/blogs/${blog.id}`} className="hover:underline">
                <h3 className="line-clamp-2 text-xl font-bold leading-tight">
                  {blog.title}
                </h3>
              </Link>
            </CardHeader>

            <CardContent>
              <p className="line-clamp-3 text-muted-foreground">
                {blog.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {blog.createdAt
                      ? formatReadableDate(blog.createdAt.toISOString())
                      : 'No date'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {Math.ceil(blog.description.length / 200)} min read
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {(() => {
                    const status: 'NEWS' | 'BLOG' | 'PRESS_RELEASE' =
                      blog.category
                    const statusInfo = {
                      NEWS: {
                        icon: (
                          <Newspaper className="h-3.5 w-3.5 text-blue-500" />
                        ),
                        label: 'News',
                      },
                      BLOG: {
                        icon: (
                          <PenLine className="h-3.5 w-3.5 text-green-500" />
                        ),
                        label: 'Blog',
                      },
                      PRESS_RELEASE: {
                        icon: (
                          <Megaphone className="h-3.5 w-3.5 text-gray-500" />
                        ),
                        label: 'Press Release',
                      },
                    }
                    const info = statusInfo[status] ?? {
                      icon: (
                        <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                      ),
                      label: blog.category,
                    }

                    return (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 px-2 py-0.5"
                      >
                        {info.icon}
                        <span>{info.label}</span>
                      </Badge>
                    )
                  })()}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between gap-2 pt-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/blogs/${blog.id}`}>
                  <Eye className="mr-1 h-3.5 w-3.5" />
                  View
                </Link>
              </Button>
              <Button variant="outline" size="sm" disabled>
                <Link href={`/blogs/edit/${blog.id}`} className="flex gap-2">
                  <Edit className="mr-1 h-3.5 w-3.5" />
                  Edit
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredBlogs?.length === 0 && (
        <div className="rounded-lg border p-8 text-center space-y-6">
          <p className="text-muted-foreground">
            No blogs match your search criteria.
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              setSearchQuery('')
              setCategoryFilter('')
              setStatusFilter('')
            }}
          >
            <RefreshCw />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
