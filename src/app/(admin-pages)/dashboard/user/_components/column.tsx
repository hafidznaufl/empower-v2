'use client'

import { type Column, type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '~/components/tables/data-table-column-header'
import { UserColumn } from './schema'
import { BadgeCheck, BadgeMinus, FilePen, MoreHorizontal } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { formatName, formatReadableDate } from '~/utils/hooks/useFormat'
import { DataTableBooleanColumnHeader } from '~/components/tables/data-table-boolean-header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import TableSheet from '~/components/tables/table-sheet'
import UpdateUserForm from './update-user-form'

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
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      const id = user.id
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
              buttonContent="Update Role User"
              title="Update Role User"
              description="Modify the role of the selected user."
              buttonVariant="default"
              buttonSize="sm"
              icon={<FilePen className="h-4 w-4" />}
            >
              <UpdateUserForm id={id ?? ''} />
            </TableSheet>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
