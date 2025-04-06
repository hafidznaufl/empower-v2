'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Card, CardHeader } from '@/components/ui/card'
import SingleBlogSkeletonLoader from '@/components/loading/single-blog-skeleton'

interface Blog {
  id: string
  title: string
  content: string
  thumbnailURL?: string
  author: {
    name: string
    email: string
    photoURL?: string
  }
}

const BlogPage = () => {
  const pathname = usePathname()
  const id = pathname.split('/').pop()

  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlog = async (blogId: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL_SERVER}/api/blogs/${blogId}`,
      )
      setBlog(response.data.data)
    } catch (err: any) {
      console.error('Error fetching blog:', err)
      setError('Failed to load blog content. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchBlog(id)
    } else {
      setError('Blog ID is missing.')
      setLoading(false)
    }
  }, [id])

  console.log(blog)

  if (loading) {
    return (
      <div className="mt-20 md:mt-8">
        {/* <SyncLoader color="#d2e755" speedMultiplier={1} /> */}
        <SingleBlogSkeletonLoader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{error}</p>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Blog not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto mb-8 mt-[4.5rem] flex flex-col md:my-8">
      <div
        className="prose mb-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <Separator />
      <p className="my-4 text-sm font-medium text-gray-600">Authored By</p>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          {blog.author.photoURL ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${blog.author.photoURL}`}
              alt={blog.author.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-600">
              {blog.author.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{blog.author.name}</p>
            <p className="text-xs text-gray-500">{blog.author.email}</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default BlogPage
