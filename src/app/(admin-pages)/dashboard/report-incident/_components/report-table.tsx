'use client'

import { DataTable } from '~/app/_components/tables/data-table'
import { api } from '~/trpc/react'
import { FilePlus2 } from 'lucide-react'
import TableSkeleton from '~/app/_components/skeletons/table-skeleton'
import { columns } from './column'
import { type ReportIncidentColumn } from './schema'
import { useExportToExcel } from '~/utils/hooks/useExportToExcel'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

export default function ReportIncidentTable() {
  const { data, isLoading, isFetching, error } = api.report.getAll.useQuery()
  const deleteManyMutation = api.report.deleteMany.useMutation()
  const { exportToExcel, exportToCSV } = useExportToExcel()

  if (isLoading || isFetching) {
    return <TableSkeleton />
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        ❌ Failed to load reports: {error.message}
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
        | 'INFORMATICS_ENGINEERING'
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

  const formatExportData = (data: ReportIncidentColumn[]) => {
    return data.map((item) => ({
      Nama: item.name,
      Email: item.email,
      'Jenis Kelamin': item.gender === 'MALE' ? 'Laki-laki' : 'Perempuan',
      'Program Studi': {
        INFORMATICS_ENGINEERING: 'Teknik Informatika',
        INFORMATION_SYSTEMS: 'Sistem Informasi',
        DIGITAL_BUSINESS: 'Bisnis Digital',
      }[item.studyProgram],
      Semester: item.semester,
      Kontak: item.contact,
      'Bersedia Dihubungi': item.willingToBeContacted ? 'Ya' : 'Tidak',
      'Status Laporan': item.reportStatus,
      'Tanggal Lahir': new Date(item.dayOfBirth).toLocaleDateString('id-ID'),
      'Tanggal Laporan': new Date(item.createdAt).toLocaleDateString('id-ID'),
      'Deskripsi Kejadian': item.incidentDescription,
      'Link File': item.fileURL ?? '-',
    }))
  }

  return (
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
        onExportExcel={() => {
          const today = format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id })
          const fileName = `Laporan-Satgas-PPKS-STTNF-${today}.xlsx`
          exportToExcel(formatExportData(formattedData), fileName)
        }}
        onExportCsv={() => {
          const today = format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id })
          const fileName = `Laporan-Satgas-PPKS-STTNF-${today}.csv`
          exportToCSV(formatExportData(formattedData), fileName)
        }}
      />
    </div>
  )
}
