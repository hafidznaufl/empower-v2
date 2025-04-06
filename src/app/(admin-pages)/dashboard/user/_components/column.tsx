'use client'

import { type Column, type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '~/components/tables/data-table-column-header'
import { UserColumn } from './schema'
import { BadgeCheck, BadgeMinus } from 'lucide-react'
import { Badge } from '~/app/_components/ui/badge'
import { formatName, formatReadableDate } from '~/utils/hooks/useFormat'
import { DataTableBooleanColumnHeader } from '~/app/_components/tables/data-table-boolean-header'

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="px-2" title="Email" />
    ),
    cell: ({ row }) => (
      <div className="px-2 font-bold">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'emailVerified',
    header: ({ column }) => (
      <DataTableBooleanColumnHeader
        column={column as Column<UserColumn, boolean>}
        className="px-2"
        title="Email Verified"
      />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('emailVerified')
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="px-2" title="Name" />
    ),
    cell: ({ row }) => <div className="px-2">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'referralCode',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="px-2"
        title="Referral Code"
      />
    ),
    cell: ({ row }) => (
      <div className="px-2">{row.getValue('referralCode')}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="px-2" title="Role" />
    ),
    cell: ({ row }) => (
      <Badge className="px-2">{formatName(row.getValue('role'))}</Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="px-2"
        title="Created At"
      />
    ),
    cell: ({ row }) => (
      <div className="px-2">
        {formatReadableDate(row.getValue('createdAt'))}
      </div>
    ),
  },
  {
    accessorKey: 'lastSignIn',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="px-2"
        title="Last Sign In"
      />
    ),
    cell: ({ row }) => (
      <div className="px-2">
        {formatReadableDate(row.getValue('lastSignIn')) ?? 'N/A'}
      </div>
    ),
  },
]
