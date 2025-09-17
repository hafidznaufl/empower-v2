'use client'

import { useParams } from 'next/navigation'
import { api } from '~/trpc/react'
import { EventDetail } from '../_components/event-details'

export default function EventPage() {
  const params = useParams()
  const id = params.id as string

  const { data: event, isLoading } = api.event.getById.useQuery(
    { id },
    { enabled: !!id },
  )

  if (isLoading) return <div>Loading...</div>
  if (!event) return <div>Data tidak ditemukan.</div>

  return <EventDetail event={event} />
}
