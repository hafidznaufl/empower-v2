'use client'

import { useParams } from 'next/navigation'
import { ReportIncidentDetail } from '../_components/report-incident-details'
import { api } from '~/trpc/react'
import EventDetailSkeleton from '~/app/_components/skeletons/event-detail-skeleton'
import DetailNotFound from '~/app/_components/skeletons/detail-not-found'

export default function ReportIncidentPage() {
  const params = useParams()
  const id = params.id as string

  const { data: incident, isLoading } = api.report.getById.useQuery(
    { id },
    { enabled: !!id },
  )

  if (isLoading) return <EventDetailSkeleton />
  if (!incident) return <DetailNotFound description="Report Incident" />

  return <ReportIncidentDetail incident={incident} />
}
