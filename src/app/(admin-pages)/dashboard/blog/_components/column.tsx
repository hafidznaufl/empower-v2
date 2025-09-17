'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import {
  BadgeCheck,
  Newspaper,
  PenLine,
  Megaphone,
  File,
  Archive,
  Mail,
} from 'lucide-react'
import { DataTableColumnHeader } from '~/components/tables/data-table-column-header'
import { Checkbox } from '~/components/ui/checkbox'
import { type BlogColumn } from './schema'
import { Badge } from '~/components/ui/badge'
import { DataTableCategoryColumnHeader } from '~/components/tables/data-table-category-header'
import { DataTableStatusColumnHeader } from '~/components/tables/data-table-status-header'
import { BlogActions } from './blog-actions'

export const columns: ColumnDef<BlogColumn>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        className="mx-2"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        className="mx-2"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="px-2" title="Title" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[350px] overflow-hidden truncate whitespace-nowrap px-2 font-medium">
        {row.getValue('title')}
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableCategoryColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const status: 'NEWS' | 'BLOG' | 'PRESS_RELEASE' = row.getValue('category')

      const statusInfo = {
        NEWS: {
          icon: <Newspaper className="h-4 w-4 text-blue-500" />,
          label: 'News',
          color: 'blue',
        },
        BLOG: {
          icon: <PenLine className="h-4 w-4 text-green-500" />,
          label: 'Blog',
          color: 'green',
        },
        PRESS_RELEASE: {
          icon: <Megaphone className="h-4 w-4 text-gray-500" />,
          label: 'Press Release',
          color: 'gray',
        },
      }

      const info = statusInfo[status] ?? {
        icon: <Megaphone className="h-4 w-4 text-muted-foreground" />,
        label: status,
        color: 'muted',
      }

      return (
        <div className="flex items-center gap-2 px-2">
          <Badge variant="outline" className="flex items-center gap-2 py-1">
            {info.icon}
            <span className="text-sm">{info.label}</span>
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'authorName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="px-2"
        title="Author Name"
      />
    ),
    cell: ({ row }) => (
      <div className="px-2 text-xs tracking-wide">
        {row.getValue('authorName')}
      </div>
    ),
  },
  {
    accessorKey: 'authorEmail',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="px-2"
        title="Author Email"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 px-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs">{row.getValue('authorEmail')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'blogStatus',
    header: ({ column }) => (
      <DataTableStatusColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: 'PENDING' | 'PUBLISHED' | 'ARCHIVED' =
        row.getValue('blogStatus')

      const statusIcon = {
        PENDING: <File className="h-5 w-5 text-yellow-500" />,
        PUBLISHED: <BadgeCheck className="h-5 w-5 text-green-500" />,
        ARCHIVED: <Archive className="h-5 w-5 text-gray-500" />,
      }

      return (
        <div className="flex items-center gap-2 px-2">
          <span className="text-sm">
            <Badge className="gap-2 py-1" variant={'outline'}>
              {statusIcon[status]}
              {status}
            </Badge>
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="px-2"
        title="Created At"
      />
    ),
    cell: ({ row }) => {
      const createdAt: string | Date = row.getValue('createdAt')

      const formattedDate = createdAt
        ? format(new Date(createdAt), 'HH:mm • EEEE, dd MMMM yyyy', {
            locale: id,
          })
        : 'Invalid Date'

      return <div className="px-2">{formattedDate}</div>
    },
    sortingFn: 'datetime',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const blog = row.original
      return <BlogActions blog={blog} />
    },
  },
]
