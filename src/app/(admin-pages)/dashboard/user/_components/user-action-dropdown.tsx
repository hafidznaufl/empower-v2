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

interface UserActionsDropdownProps {
  onEdit: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserActionsDropdown({
  onEdit,
  open,
  onOpenChange,
}: UserActionsDropdownProps) {
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
        <Button
          onClick={() => handleClick(onEdit)}
          variant={'ghost'}
          size={'sm'}
        >
          <FilePen className="mr-2 h-4 w-4" />
          Update User Role
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
