'use client'

import { Column, type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import {
  MoreHorizontal,
  Phone,
  Mail,
  BadgeCheck,
  BadgeMinus,
  CircleAlert,
  FilePen,
  Binoculars,
  View,
} from 'lucide-react'

import { Checkbox } from '~/components/ui/checkbox'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '~/components/tables/data-table-column-header'
import { ReportIncidentColumn } from './schema'
import { DataTableStatusColumnHeader } from '~/components/tables/data-table-status-header'
import { DataTableBooleanColumnHeader } from '~/app/_components/tables/data-table-boolean-header'
import { useRouter } from 'next/navigation'
import TableSheet from '~/app/_components/tables/table-sheet'
import UpdateIncidentStatusForm from './update-status-report'

export const columns: ColumnDef<ReportIncidentColumn>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mx-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mx-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="px-2">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 px-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs">{row.getValue('email')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'contact',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 px-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs">{row.getValue('contact')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'willingToBeContacted',
    header: ({ column }) => (
      <DataTableBooleanColumnHeader
        column={column as Column<ReportIncidentColumn, boolean>}
        className="px-2"
        title="Willing To Be Contacted"
      />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('willingToBeContacted')
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
    accessorKey: 'reportStatus',
    header: ({ column }) => (
      <DataTableStatusColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: ReportIncidentColumn['reportStatus'] =
        row.getValue('reportStatus')

      const statusInfo = {
        PENDING: {
          icon: <CircleAlert className="h-4 w-4 text-yellow-500" />,
          label: 'Menunggu',
          color: 'yellow',
        },
        IN_PROCESS: {
          icon: <BadgeMinus className="h-4 w-4 text-blue-500" />,
          label: 'Diproses',
          color: 'blue',
        },
        PROVEN_LIGHTLY_SACTIONED: {
          icon: <BadgeCheck className="h-4 w-4 text-green-500" />,
          label: 'Terbukti (Ringan)',
          color: 'green',
        },
        PROVEN_MODERATElYY_SACTIONED: {
          icon: <BadgeCheck className="h-4 w-4 text-emerald-600" />,
          label: 'Terbukti (Sedang)',
          color: 'emerald',
        },
        PROVEN_SEVERELY_SACTIONED: {
          icon: <BadgeCheck className="h-4 w-4 text-red-500" />,
          label: 'Terbukti (Berat)',
          color: 'red',
        },
      }

      const info = statusInfo[status] ?? {
        icon: <CircleAlert className="h-4 w-4 text-muted-foreground" />,
        label: status.replaceAll('_', ' '),
        color: 'muted',
      }

      return (
        <div className="flex items-center gap-2 px-2">
          <Badge variant="outline" className="flex items-center gap-2 py-1">
            {info.icon}
            <span className="text-sm">{info.label}</span>
          </Badge>
        </div>
      )
    },
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
    cell: ({ row }) => {
      const createdAt: string | Date = row.getValue('createdAt')

      const formattedDate = createdAt
        ? format(new Date(createdAt), 'HH:mm • EEEE, dd MMMM yyyy', {
            locale: id,
          })
        : 'Invalid Date'

      return <div className="px-2">{formattedDate}</div>
    },
    sortingFn: 'datetime',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter()
      const incident = row.original

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
            <div className="space-y-1">
              <Button
                onClick={() =>
                  router.push(`/dashboard/report-incident/${incident.id}`)
                }
                size={'sm'}
              >
                <View className="h-4 w-4" />
                View Details
              </Button>
              <TableSheet
                button={true}
                buttonContent="Update Status"
                title="Update Role User"
                description="Modify the role of the selected user."
                buttonVariant="default"
                buttonSize="sm"
                icon={<FilePen className="h-4 w-4" />}
              >
                <UpdateIncidentStatusForm id={incident.id ?? ''} />
              </TableSheet>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
