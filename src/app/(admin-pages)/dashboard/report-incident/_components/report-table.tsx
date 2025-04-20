'use client'

import { DataTable } from '~/app/_components/tables/data-table'
import { api } from '~/trpc/react'
import { FilePlus2 } from 'lucide-react'
import { Suspense } from 'react'
import TableSkeleton from '~/app/_components/skeletons/table-skeleton'
import { columns } from './column'
import { ReportIncidentColumn } from './schema'

export default function ReportIncidentTable() {
  const { data, isLoading, isFetching, error } = api.report.getAll.useQuery()
  const deleteManyMutation = api.report.deleteMany.useMutation()

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

  const formattedData: ReportIncidentColumn[] =
    data?.map((report) => ({
      id: report.id,
      name: report.name,
      email: report.email,
      gender: report.gender as 'MALE' | 'FEMALE',
      studyProgram: report.studyProgram as
        | 'COMPUTER_ENGINEERING'
        | 'INFORMATION_SYSTEMS'
        | 'DIGITAL_BUSINESS',
      semester: report.semester,
      contact: report.contact,
      willingToBeContacted: report.willingToBeContacted,
      reportStatus: report.reportStatus,
      createdAt: report.createdAt,
      fileURL: report.fileURL,
      dayOfBirth: report.dayOfBirth,
      incidentDescription: report.incidentDescription,
    })) ?? []

  return (
    <Suspense>
      <div className="mt-4 px-8">
        <DataTable
          columns={columns}
          data={formattedData}
          placeholderFilter="Search by Email"
          columnFilterName="email"
          buttonContent="Create Report Incident"
          sheetTitle="Create a New Voucher"
          sheetDescription="Fill in the form below to create a new voucher."
          sheetIcon={<FilePlus2 className="h-4 w-4" />}
          deleteManyMutation={deleteManyMutation}
          useSheet={false}
          linkTo="/report-incident"
        />
      </div>
    </Suspense>
  )
}
