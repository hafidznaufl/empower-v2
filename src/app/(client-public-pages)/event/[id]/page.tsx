'use client'

import { useParams } from 'next/navigation'
import { EventDetail } from '~/app/(admin-pages)/dashboard/event/_components/event-details'
import { api } from '~/trpc/react'

import DetailNotFound from '~/app/_components/skeletons/detail-not-found'
import EventDetailSkeleton from '~/app/_components/skeletons/event-detail-skeleton'

export default function EventPage() {
  const params = useParams()
  const id = params.id as string

  const { data: event, isLoading } = api.event.getById.useQuery(
    { id },
    { enabled: !!id },
  )

  if (isLoading) return <EventDetailSkeleton />
  if (!event) return <DetailNotFound description="Event" />

  return <EventDetail event={event} redirectUrl="/event" />
}
