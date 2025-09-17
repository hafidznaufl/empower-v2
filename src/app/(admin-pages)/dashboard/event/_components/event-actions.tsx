'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type EventColumn } from './schema'
import { Sheet, SheetContent } from '~/components/ui/sheet'
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '~/components/ui/dialog'
import UpdateEventForm from './update-event-form'
import { EventActionsDropdown } from './event-action-dropdown'

interface EventActionsProps {
  event: EventColumn
}

export function EventActions({ event }: EventActionsProps) {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  return (
    <>
      <EventActionsDropdown
        open={openDropdown}
        onOpenChange={setOpenDropdown}
        onViewDetails={() => router.push(`/dashboard/event/${event.id}`)}
        onEdit={() => setOpenSheet(true)}
      />

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="right" className="w-[600px] sm:w-[800px]">
          <DialogHeader>
            <DialogTitle>Update Event</DialogTitle>
            <DialogDescription>
              Modify the selected event details.
            </DialogDescription>
          </DialogHeader>

          <UpdateEventForm id={event.id} />
        </SheetContent>
      </Sheet>
    </>
  )
}
