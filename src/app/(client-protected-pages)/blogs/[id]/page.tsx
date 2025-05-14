'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Copy, Check } from 'lucide-react'
import SingleBlogSkeletonLoader from '~/components/skeletons/single-blog-skeleton'
import { Card, CardHeader } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'
import { api } from '~/trpc/react'
import { toast } from 'sonner'

const BlogPage = () => {
  const pathname = usePathname()
  const id = pathname.split('/').pop()
  const [copied, setCopied] = useState(false)

  const {
    data: blog,
    isLoading,
    error,
  } = api.blog.getById.useQuery({ id: id! }, { enabled: !!id })

  const fullUrl = typeof window !== 'undefined' ? window.location.href : ''

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      toast.success('Link copied!', {
        description: 'The blog link has been copied to your clipboard.',
        duration: 3000,
      })
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      toast.error('Failed to copy', {
        description: 'Please try again or copy the URL manually.',
        duration: 3000,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="mt-20 md:mt-8">
        <SingleBlogSkeletonLoader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{error.message || 'Failed to load blog content.'}</p>
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
        dangerouslySetInnerHTML={{ __html: (blog.content as string) || '' }}
      />
      <Separator />
      <p className="my-4 text-sm font-medium text-gray-600">Authored By</p>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            {blog.author.avatarURL ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${blog.author.avatarURL}`}
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
          </div>

          {/* Copy Link Button */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 rounded-full"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="text-xs">Copy link</span>
              </>
            )}
          </Button>
        </CardHeader>
      </Card>
    </div>
  )
}

export default BlogPage
