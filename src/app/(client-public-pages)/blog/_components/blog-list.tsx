'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '~/components/ui/badge'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { id } from 'date-fns/locale'
import BlogSkeletonLoader from '~/app/_components/skeletons/blog-skeleton'

interface Blog {
  id: string
  title: string
  description: string
  content: string
  status: string
  category: string
  thumbnailURL?: string
  createdAt: string
  author: {
    name: string
    email: string
    photoURL?: string
  }
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL_SERVER}/api/blogs`,
      )
      setBlogs(response.data.data)
    } catch (err: any) {
      setError('Failed to load blog content. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="mt-20 gap-1">
        <BlogSkeletonLoader />
        <BlogSkeletonLoader />
        <BlogSkeletonLoader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No blogs found</p>
      </div>
    )
  }

  const groupedBlogs = blogs.reduce(
    (acc, blog) => {
      if (!acc[blog.category]) {
        acc[blog.category] = []
      }
      acc[blog.category]?.push(blog)
      return acc
    },
    {} as Record<string, Blog[]>,
  )

  return (
    <div className="container mx-auto mt-20">
      {Object.entries(groupedBlogs).map(([category, blogList]) => (
        <div key={category} className="mb-4">
          <h2 className="mb-4 text-2xl font-bold capitalize">
            {category.replace('_', ' ').toLowerCase()}
          </h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              el: '.custom-pagination',
              clickable: true,
            }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {blogList.map((blog) => (
              <SwiperSlide key={blog.id}>
                <Card className="relative flex flex-col justify-between shadow-none transition">
                  <Link href={`/blogs/${blog.id}`}>
                    {blog.thumbnailURL && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${blog.thumbnailURL}`}
                        alt={blog.title}
                        className="h-48 w-full rounded-t-lg object-cover"
                      />
                    )}
                    <Badge
                      className="absolute right-3 top-3 rounded-sm"
                      variant={'secondary'}
                    >
                      {blog.category === 'NEWS'
                        ? 'News'
                        : blog.category === 'BLOG'
                          ? 'Blog'
                          : blog.category === 'PRESS_RELEASE'
                            ? 'Press Release'
                            : blog.category}
                    </Badge>
                    <CardHeader className="flex h-24 flex-col justify-between space-y-0 pb-2">
                      <CardTitle className="line-clamp-2">
                        {blog.title}
                      </CardTitle>
                      <CardDescription>
                        {format(blog.createdAt, 'eeee, dd MMMM yyyy', {
                          locale: id,
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-sm text-gray-700 dark:text-gray-300">
                        {blog.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex items-center gap-4">
                      {blog.author?.photoURL && (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${blog.author.photoURL}`}
                          alt={blog.author.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold">
                          {blog.author?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {blog.author?.email}
                        </p>
                      </div>
                    </CardFooter>
                  </Link>
                </Card>
              </SwiperSlide>
            ))}
            <div className="custom-pagination mt-2 flex justify-center dark:active:bg-yellow-400"></div>
          </Swiper>
        </div>
      ))}
    </div>
  )
}
