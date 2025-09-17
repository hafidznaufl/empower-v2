import { Button } from '~/components/ui/button'
import { CircleX, Trash } from 'lucide-react'
import { type UseMutationResult } from '@tanstack/react-query'
import { type Table } from '@tanstack/react-table'
import { api } from '~/trpc/react'

interface TableDeleteSelectedProps<TData extends { id: string }> {
  buttonContent: string
  table: Table<TData>
  deleteManyMutation?: UseMutationResult<
    unknown,
    unknown,
    { ids: string[] },
    unknown
  >
}

export default function TableDeleteSelected<TData extends { id: string }>({
  buttonContent,
  deleteManyMutation,
  table,
}: TableDeleteSelectedProps<TData>) {
  const utils = api.useUtils()

  const handleDelete = async () => {
    try {
      const selectedIds = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original.id)

      if (selectedIds.length === 0) {
        alert('No vouchers selected.')
        return
      }

      if (deleteManyMutation) {
        await deleteManyMutation.mutateAsync({ ids: selectedIds })
      } else {
        console.error('deleteManyMutation is undefined.')
        alert('Delete operation is not available.')
      }
      await utils.blog.getAll.invalidate()
      table.resetRowSelection()
    } catch (error) {
      console.error('Error deleting vouchers:', error)
      alert('Failed to delete vouchers. Please try again.')
    }
  }

  return (
    <div className="space-x-4">
      <Button
        variant="outline"
        size="default"
        onClick={() => table.resetRowSelection()}
      >
        <CircleX />
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={deleteManyMutation?.status === 'pending'}
      >
        <Trash className="h-4 w-4" />
        {deleteManyMutation?.status === 'pending'
          ? 'Deleting...'
          : buttonContent}
      </Button>
    </div>
  )
}
