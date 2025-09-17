'use client'

import { DataTable } from '~/app/_components/tables/data-table'
import { api } from '~/trpc/react'
import { FilePlus2 } from 'lucide-react'
import { Suspense } from 'react'
import { type BlogColumn } from './schema'
import TableSkeleton from '~/app/_components/skeletons/table-skeleton'
import { columns } from './column'

export default function VoucherTable() {
  const { data, isLoading, isFetching, error } = api.blog.getAll.useQuery()
  const deleteManyMutation = api.blog.deleteMany.useMutation()

  if (isLoading || isFetching) {
    return <TableSkeleton />
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        ❌ Failed to load vouchers: {error.message}
      </p>
    )
  }

  const formattedData: BlogColumn[] =
    data?.map((blog) => ({
      id: blog.id,
      title: blog.title,
      category: blog.category,
      description: blog.description,
      authorName: blog.author.name,
      authorEmail: blog.author.email,
      blogStatus: blog.blogStatus,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      thumbnailURL: blog.thumbnailURL ?? null,
    })) ?? []

  return (
    <Suspense>
      <div className="mt-4 px-8">
        <DataTable
          columns={columns}
          data={formattedData}
          placeholderFilter="Search by Author Email"
          columnFilterName="authorName"
          buttonContent="Create Blog"
          sheetTitle="Create a New Voucher"
          sheetDescription="Fill in the form below to create a new voucher."
          sheetIcon={<FilePlus2 className="h-4 w-4" />}
          deleteManyMutation={deleteManyMutation}
          useSheet={false}
          linkTo="/new-blog"
        />
      </div>
    </Suspense>
  )
}
