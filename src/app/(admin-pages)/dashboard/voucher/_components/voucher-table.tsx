'use client'

import { DataTable } from '~/app/_components/tables/data-table'
import { columns } from './columns'
import { type VoucherColumn } from './schemas'
import { api } from '~/trpc/react'
import VoucherTableSkeleton from '~/app/_components/skeletons/voucher-table-skeleton'
import { FilePlus2 } from 'lucide-react'
import CreateVoucherForm from './create-voucher-form'

export default function VoucherTable() {
  const { data, isLoading, isFetching, error } = api.voucher.getAll.useQuery()
  const deleteManyMutation = api.voucher.deleteMany.useMutation()

  if (isLoading || isFetching) {
    return <VoucherTableSkeleton />
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        ❌ Failed to load vouchers: {error.message}
      </p>
    )
  }

  const formattedData: VoucherColumn[] =
    data?.map((voucher) => ({
      id: voucher.id ?? '',
      code: voucher.code,
      discount: voucher.discount,
      expiryDate:
        typeof voucher.expiryDate === 'string'
          ? new Date(voucher.expiryDate)
          : voucher.expiryDate,
      isActive: voucher.isActive,
      minTransaction: voucher.minTransaction,
      description: voucher.description,
      usageLimit: voucher.usageLimit,
    })) ?? []

  if (formattedData.length === 0) {
    return <VoucherTableSkeleton />
  }

  return (
    <div className="mt-4 px-8">
      <DataTable
        columns={columns}
        data={formattedData}
        placeholderFilter="Search by Code"
        columnFilterName="code"
        buttonContent="Create Voucher"
        sheetTitle="Create a New Voucher"
        sheetDescription="Fill in the form below to create a new voucher."
        sheetIcon={<FilePlus2 className="h-4 w-4" />}
        deleteManyMutation={deleteManyMutation}
        components={{ CustomComponent: CreateVoucherForm }}
      />
    </div>
  )
}
