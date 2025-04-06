import { type Column } from '@tanstack/react-table'
import { Check, X, ChevronsUpDown, EyeOff } from 'lucide-react'

import { cn } from '~/utils/cn'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

interface DataTableBooleanColumnHeaderProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, boolean>
  title: string
}

export function DataTableBooleanColumnHeader<TData>({
  column,
  title,
  className,
}: DataTableBooleanColumnHeaderProps<TData>) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            <ChevronsUpDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.setFilterValue(true)}>
            <Check className="h-3.5 w-3.5 text-green-500" />
            Active
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.setFilterValue(false)}>
            <X className="h-3.5 w-3.5 text-red-500" />
            Inactive
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.setFilterValue(undefined)}>
            <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            Clear Filter
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
