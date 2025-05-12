'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Sheet, SheetContent } from '~/components/ui/sheet'
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '~/components/ui/dialog'
import { EventActionsDropdown } from './blog-action-dropdown'
import { BlogColumn } from './schema'
import UpdateBlogStatusForm from './update-blog-form'

interface BlogActionsProps {
  blog: BlogColumn
}

export function BlogActions({ blog }: BlogActionsProps) {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  return (
    <>
      <EventActionsDropdown
        open={openDropdown}
        onOpenChange={setOpenDropdown}
        onViewDetails={() => router.push(`/blogs/${blog.id}`)}
        onEdit={() => setOpenSheet(true)}
      />

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="right" className="w-[600px] sm:w-[800px]">
          <DialogHeader>
            <DialogTitle>Update Blog Status</DialogTitle>
            <DialogDescription>
              Modify the selected Blog Status details.
            </DialogDescription>
          </DialogHeader>

          <UpdateBlogStatusForm id={blog.id} />
        </SheetContent>
      </Sheet>
    </>
  )
}
