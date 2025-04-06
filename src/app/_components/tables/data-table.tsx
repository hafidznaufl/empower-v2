'use client'

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { DataTablePagination } from './table-pagination'
import { DataTableViewOptions } from './table-view-options'
import { Input } from '../ui/input'
import TableSheet from './table-sheet'
import CreateVoucherForm from '~/app/(admin-pages)/dashboard/voucher/_components/create-voucher-form'
import { type UseMutationResult } from '@tanstack/react-query'
import TableDeleteSelected from './table-delete-selected'
import { FileWarning } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  placeholderFilter?: string
  columnFilterName: string
  buttonContent: string
  sheetTitle: string
  sheetDescription: string
  sheetIcon: React.ReactNode
  deleteManyMutation?: UseMutationResult<
    unknown,
    unknown,
    { ids: string[] },
    unknown
  >
  allowCreate?: boolean
  allowDelete?: boolean
  components?: {
    CustomComponent?: React.FC
  }
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  placeholderFilter = 'Search',
  columnFilterName,
  buttonContent,
  sheetTitle,
  sheetDescription,
  sheetIcon,
  deleteManyMutation,
  components,
  allowCreate = true,
  allowDelete = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder={placeholderFilter}
          value={
            (table.getColumn(columnFilterName)?.getFilterValue() as string) ??
            ''
          }
          onChange={(event) =>
            table
              .getColumn(columnFilterName)
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-4">
          {Object.keys(rowSelection).length > 0 ? (
            allowDelete && (
              <TableDeleteSelected
                buttonContent="Delete Selected"
                deleteManyMutation={deleteManyMutation}
                table={table}
              />
            )
          ) : (
            <>
              <DataTableViewOptions table={table} />
              {allowCreate && (
                <TableSheet
                  buttonContent={buttonContent}
                  title={sheetTitle}
                  description={sheetDescription}
                  icon={sheetIcon}
                >
                  {components?.CustomComponent ? (
                    <components.CustomComponent />
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <FileWarning className="mb-2 h-6 w-6" />
                      <p className="text-sm">
                        Oops! No custom component found.
                      </p>
                      <p className="text-xs">
                        Please provide a valid component.
                      </p>
                    </div>
                  )}
                </TableSheet>
              )}
            </>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => row.toggleSelected()}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
