'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Clock, FilePen, MapPin, MoreHorizontal, View } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Checkbox } from '~/components/ui/checkbox'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '~/components/tables/data-table-column-header'
import { EventColumn } from './schema'
import TableSheet from '~/components/tables/table-sheet'
import UpdateEventForm from './update-event-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import Image from 'next/image'
import { EventActions } from './event-actions'

export const columns: ColumnDef<EventColumn>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mx-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mx-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="px-2 font-medium">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 px-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs">{row.getValue('location')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date: Date | string = row.getValue('date')
      return (
        <div className="px-2">
          {format(new Date(date), 'EEEE, dd MMMM yyyy', { locale: id })}
        </div>
      )
    },
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'timeStart',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time Start" />
    ),
    cell: ({ row }) => {
      const time: Date | string = row.getValue('timeStart')
      return (
        <div className="flex items-center gap-2 px-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          {format(new Date(time), 'HH:mm')}
        </div>
      )
    },
  },
  {
    accessorKey: 'timeEnd',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time End" />
    ),
    cell: ({ row }) => {
      const time: Date | string = row.getValue('timeEnd')
      return (
        <div className="flex items-center gap-2 px-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          {format(new Date(time), 'HH:mm')}
        </div>
      )
    },
  },
  {
    accessorKey: 'room',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room" />
    ),
    cell: ({ row }) => <div className="px-2">{row.getValue('room')}</div>,
  },
  {
    accessorKey: 'capacity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => <div className="px-2">{row.getValue('capacity')}</div>,
  },
  {
    accessorKey: 'thumbnailURL',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thumbnail" />
    ),
    cell: ({ row }) => {
      const url = row.getValue<string>('thumbnailURL')

      return (
        <div className="px-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-1 text-sm">
                Preview Thumbnail
              </Button>
            </DialogTrigger>

            <DialogContent className="h-[1000px] w-[1600px] max-w-full p-6">
              <DialogHeader>
                <DialogTitle>Thumbnail Preview</DialogTitle>
                <DialogDescription>
                  Gambar ini adalah thumbnail untuk event{' '}
                  <strong>{row.original.title}</strong>.
                </DialogDescription>
              </DialogHeader>

              {url ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL + url
                    }
                    alt="Thumbnail Preview"
                    width={1600}
                    height={900}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="mt-4 text-center text-muted-foreground">
                  No thumbnail available.
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue<Date | string>('createdAt')
      return (
        <div className="px-2">
          {format(new Date(createdAt), 'HH:mm • dd MMM yyyy', { locale: id })}
        </div>
      )
    },
    sortingFn: 'datetime',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original
      return <EventActions event={event} />
    },
  },
]
