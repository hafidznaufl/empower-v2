'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { DataTableColumnHeader } from '~/components/table/table-column-header'

export type VoucherColumn = {
  id: string
  code: string
  discount: number
  expiryDate: string
  isActive: boolean
  minTransaction: number
}

export const columns: ColumnDef<VoucherColumn>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="px-2" title="Code" />
    ),
    cell: ({ row }) => (
      <div className="px-2 font-bold">{row.getValue('code')}</div>
    ),
  },
  {
    accessorKey: 'discount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="px-2"
        title="Discount"
      />
    ),
    cell: ({ row }) => <div className="px-2">{row.getValue('discount')}</div>,
  },
  {
    accessorKey: 'expiryDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="px-2"
        title="Expiry Date"
      />
    ),
    cell: ({ row }) => {
      const expiryDate: string | Date = row.getValue('expiryDate')

      const formattedDate = expiryDate
        ? format(new Date(expiryDate), 'EEEE, dd MMMM yyyy', { locale: id })
        : 'Invalid Date'

      return <div className="px-2">{formattedDate}</div>
    },
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'minTransaction',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="px-2"
        title="Min Transaction"
      />
    ),
    cell: ({ row }) => (
      <div className="px-2">{row.getValue('minTransaction')}</div>
    ),
  },
]
