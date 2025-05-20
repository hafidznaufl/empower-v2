'use client'

import { FilePen, MoreHorizontal, View } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

interface BlogActionsDropdownProps {
  onViewDetails: () => void
  onEdit: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventActionsDropdown({
  onViewDetails,
  onEdit,
  open,
  onOpenChange,
}: BlogActionsDropdownProps) {
  const handleClick = (callback: () => void) => {
    onOpenChange(false)
    setTimeout(callback, 50)
  }

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => onOpenChange(!open)}
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <div className="flex flex-col space-y-1">
          <Button
            onClick={() => handleClick(onViewDetails)}
            variant={'ghost'}
            size={'sm'}
          >
            <View className="mr-2 h-4 w-4" />
            View Blog
          </Button>
          <Button
            onClick={() => handleClick(onEdit)}
            variant={'ghost'}
            size={'sm'}
          >
            <FilePen className="mr-2 h-4 w-4" />
            Update Status Blog
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
