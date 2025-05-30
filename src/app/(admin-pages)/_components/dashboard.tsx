'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/app/_components/ui/card'
import { api } from '~/trpc/react'
import { type ReportIncident } from '@prisma/client'
import { Skeleton } from '~/app/_components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '~/app/_components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { RecentReports } from './recent-report'
import Overview from './overview'

interface ChartData {
  name: string
  total: number
}

export default function DashboardPage() {
  const {
    data: reportIncidents,
    isLoading: isLoadingReports,
    error: errorReports,
  } = api.report.getAll.useQuery()
  const {
    data: blogs,
    isLoading: isLoadingBlogs,
    error: errorBlogs,
  } = api.blog.getAll.useQuery()
  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = api.event.getAll.useQuery()
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = api.user.getAll.useQuery()

  const error = errorReports || errorBlogs || errorEvents || errorUsers

  const defaultStatuses = [
    'PENDING',
    'IN_PROCESS',
    'PROVEN_LIGHTLY_SANCTIONED',
    'PROVEN_MODERATElYY_SANCTIONED',
    'PROVEN_SEVERELY_SANCTIONED',
    'SOLVED',
    'NOT_PROVEN',
    'NOT_SANCTIONED',
  ]

  const formatChartData = (reports: ReportIncident[]): ChartData[] => {
    const categoryCount = reports.reduce(
      (acc, report) => {
        acc[report.reportStatus] = (acc[report.reportStatus] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return defaultStatuses.map((status) => ({
      name: status,
      total: categoryCount[status] || 0,
    }))
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Alert variant="destructive" className="w-[600px]">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Gagal memuat data: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (isLoadingReports || isLoadingBlogs || isLoadingEvents || isLoadingUsers) {
    return (
      <div className="flex flex-col space-y-4 p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[146px] w-full rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="col-span-4 h-[400px] rounded-xl" />
          <Skeleton className="col-span-3 h-[400px] rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Laporan"
          value={reportIncidents?.length || 0}
          description="+5 dari bulan lalu"
        />
        <DashboardCard
          title="Total Blog"
          value={blogs?.length || 0}
          description="+10 dari bulan lalu"
        />
        <DashboardCard
          title="Total Event"
          value={events?.length || 0}
          description="+3 event baru"
        />
        <DashboardCard
          title="Total Pengguna"
          value={users?.length || 0}
          description="+20 pengguna baru"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        <Card className="col-span-9">
          <CardHeader>
            <CardTitle>Statistik Kategori Laporan</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview
              data={formatChartData(
                (reportIncidents || []).map((report) => ({
                  ...report,
                  updatedAt: new Date(),
                  deletedAt: report.deletedAt || null,
                })),
              )}
            />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Laporan Terbaru</CardTitle>
            <CardDescription>
              {reportIncidents?.length} laporan ditemukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentReports
              reports={(reportIncidents || []).map((report) => ({
                ...report,
                updatedAt: report.updatedAt || new Date(),
                deletedAt: report.deletedAt || null,
              }))}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  value,
  description,
}: {
  title: string
  value: number
  description: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
