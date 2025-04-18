'use client'

import { useParams } from 'next/navigation'
import { ReportIncidentDetail } from '../_components/report-incident-details'
import { api } from '~/trpc/react'

export default function ReportIncidentPage() {
  const params = useParams()
  const id = params.id as string

  const { data: incident, isLoading } = api.report.getById.useQuery(
    { id },
    { enabled: !!id },
  )

  if (isLoading) return <div>Loading...</div>
  if (!incident) return <div>Data tidak ditemukan.</div>

  return <ReportIncidentDetail incident={incident} />
}
