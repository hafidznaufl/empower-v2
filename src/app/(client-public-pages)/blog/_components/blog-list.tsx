'use client'

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
import { api } from '~/trpc/react'

export default function BlogList() {
  const {
    data: blogs,
    isLoading,
    isError,
  } = api.blog.getAllPublished.useQuery()

  if (isLoading) {
    return (
      <div className="mt-20 gap-1">
        <BlogSkeletonLoader />
        <BlogSkeletonLoader />
        <BlogSkeletonLoader />
      </div>
    )
  }

  if (isError || !blogs) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">
          Failed to load blog content. Please try again later.
        </p>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No blogs found</p>
      </div>
    )
  }

  const groupedBlogs = blogs.reduce(
    (acc, blog) => {
      if (!acc[blog.category]) acc[blog.category] = []
      acc[blog.category]?.push(blog)
      return acc
    },
    {} as Record<string, typeof blogs>,
  )

  return (
    <div className="container mx-auto mt-20 space-y-4 px-4">
      {Object.entries(groupedBlogs).map(([category, blogList]) => (
        <div key={category} className="mt-0">
          <h2 className="mb-2 text-2xl font-bold capitalize text-gray-800 dark:text-white">
            {category.replace('_', ' ').toLowerCase()}
          </h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ el: '.custom-pagination', clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {blogList.map((blog) => (
              <SwiperSlide key={blog.id}>
                <Link href={`/blogs/${blog.id}`}>
                  <Card className="group h-full overflow-hidden border bg-card shadow-none transition-all duration-300">
                    {blog.thumbnailURL && (
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          fill
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL}${blog.thumbnailURL}`}
                          alt={blog.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        <Badge
                          className="absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-medium shadow-md backdrop-blur-sm"
                          variant="default"
                        >
                          {blog.category === 'NEWS'
                            ? 'News'
                            : blog.category === 'BLOG'
                              ? 'Blog'
                              : blog.category === 'PRESS_RELEASE'
                                ? 'Press Release'
                                : blog.category}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="px-5 pb-2 pt-5">
                      <CardTitle className="line-clamp-2 text-xl font-bold leading-tight tracking-tight transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className="mt-2 flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span className="inline-block h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                        {format(blog.createdAt, 'eeee, dd MMMM yyyy')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      <p className="line-clamp-2">{blog.description}</p>
                    </CardContent>
                    <CardFooter className="mt-auto flex items-center gap-3 border-t border-gray-100 px-5 py-4 dark:border-gray-800">
                      {blog.author?.avatarURL ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL}/${blog.author.avatarURL}`}
                          alt={blog.author.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm dark:border-gray-800"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600 shadow-sm dark:bg-gray-700 dark:text-white">
                          {blog.author?.name?.charAt(0) || 'A'}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {blog.author?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {blog.author?.email}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
            <div className="custom-pagination mt-3 flex justify-center" />
          </Swiper>
        </div>
      ))}
    </div>
  )
}
