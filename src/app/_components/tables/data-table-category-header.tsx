import { type Column } from '@tanstack/react-table'
import {
  Newspaper,
  PenLine,
  Megaphone,
  ChevronsUpDown,
  EyeOff,
} from 'lucide-react'

import { cn } from '~/utils/cn'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

interface DataTableCategoryColumnHeaderProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, unknown>
  title: string
}

const categoryOptions = [
  { label: 'News', value: 'NEWS', icon: Newspaper },
  { label: 'Blog', value: 'BLOG', icon: PenLine },
  { label: 'Press Release', value: 'PRESS_RELEASE', icon: Megaphone },
]

export function DataTableCategoryColumnHeader<TData>({
  column,
  title,
  className,
}: DataTableCategoryColumnHeaderProps<TData>) {
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
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {categoryOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => column.setFilterValue(option.value)}
            >
              <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              {option.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={() => column.setFilterValue(undefined)}>
            <ChevronsUpDown className="mr-2 h-4 w-4 text-muted-foreground/70" />
            Clear Filter
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="mr-2 h-4 w-4 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
