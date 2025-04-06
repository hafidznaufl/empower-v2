'use client'

import { type Column, type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { BadgeCheck, BadgeMinus, FilePen, MoreHorizontal } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import UpdateVoucherForm from './update-voucher-form'
import { type VoucherColumn } from './schemas'
import { formatCurrency } from '~/utils/currency'
import { DataTableColumnHeader } from '~/components/tables/data-table-column-header'
import { DataTableBooleanColumnHeader } from '~/components/tables/data-table-boolean-header'
import { Checkbox } from '~/components/ui/checkbox'
import TableSheet from '~/app/_components/tables/table-sheet'

export const columns: ColumnDef<VoucherColumn>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        className="mx-2"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        className="mx-2"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    cell: ({ row }) => <div className="px-2">{row.getValue('discount')}%</div>,
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
      <div className="px-2">
        {formatCurrency(row.getValue('minTransaction'))}
      </div>
    ),
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
    accessorKey: 'usageLimit',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="px-2"
        title="Usage Limit"
      />
    ),
    cell: ({ row }) => <div className="px-2">{row.getValue('usageLimit')}</div>,
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableBooleanColumnHeader
        column={column as Column<VoucherColumn, boolean>}
        className="px-2"
        title="Active"
      />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('isActive')
      return (
        <div className="px-2">
          {isActive ? (
            <BadgeCheck className="h-5 w-5 text-green-500" />
          ) : (
            <BadgeMinus className="h-5 w-5 text-red-500" />
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const voucher = row.original
      const id = voucher.id
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <TableSheet
              button={true}
              buttonContent="Update Voucher"
              title="Update Voucher"
              description="Modify the details of the selected voucher."
              buttonVariant="default"
              buttonSize="sm"
              icon={<FilePen className="h-4 w-4" />}
            >
              <UpdateVoucherForm id={id ?? ''} />
            </TableSheet>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
