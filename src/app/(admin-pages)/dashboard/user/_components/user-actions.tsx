'use client'

import { useState } from 'react'
import { Sheet, SheetContent } from '~/components/ui/sheet'
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '~/components/ui/dialog'
import UpdateUserForm from './update-user-form'
import { UserColumn } from './schema'
import { UserActionsDropdown } from './user-action-dropdown'

interface UserActionsProps {
  user: UserColumn
}

export function UserActions({ user }: UserActionsProps) {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  return (
    <>
      <UserActionsDropdown
        open={openDropdown}
        onOpenChange={setOpenDropdown}
        onEdit={() => setOpenSheet(true)}
      />

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="right" className="w-[600px] sm:w-[800px]">
          <DialogHeader>
            <DialogTitle>Update User Role</DialogTitle>
            <DialogDescription>
              Modify the role of the selected user.
            </DialogDescription>
          </DialogHeader>
          <UpdateUserForm id={user.id} />
        </SheetContent>
      </Sheet>
    </>
  )
}
