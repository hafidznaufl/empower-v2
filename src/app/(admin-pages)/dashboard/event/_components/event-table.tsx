'use client'

import { Suspense } from 'react'
import { FilePlus2 } from 'lucide-react'

import { api } from '~/trpc/react'
import { DataTable } from '~/app/_components/tables/data-table'
import TableSkeleton from '~/app/_components/skeletons/table-skeleton'
import { columns } from './column'
import { EventColumn } from './schema'

export default function EventTable() {
  const { data, isLoading, isFetching, error } = api.event.getAll.useQuery()
  const deleteManyMutation = api.event.deleteMany.useMutation()

  if (isLoading || isFetching) {
    return <TableSkeleton />
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        ❌ Failed to load events: {error.message}
      </p>
    )
  }

  const formattedData: EventColumn[] =
    data?.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      room: event.room,
      capacity: event.capacity,
      date: event.date,
      timeStart: event.timeStart,
      timeEnd: event.timeEnd,
      thumbnailURL: event.thumbnailURL,
      createdAt: event.createdAt,
    })) ?? []

  return (
    <Suspense>
      <div className="mt-4 px-8">
        <DataTable
          columns={columns}
          data={formattedData}
          placeholderFilter="Search by Title"
          columnFilterName="title"
          buttonContent="Create New Event"
          sheetTitle="Create Event"
          sheetDescription="Fill in the form below to create a new event."
          sheetIcon={<FilePlus2 className="h-4 w-4" />}
          deleteManyMutation={deleteManyMutation}
        />
      </div>
    </Suspense>
  )
}
