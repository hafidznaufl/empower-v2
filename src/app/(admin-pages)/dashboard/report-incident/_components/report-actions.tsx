'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Sheet, SheetContent } from '~/components/ui/sheet'
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '~/components/ui/dialog'
import { ReportActionsDropdown } from './report-action-dropdown'
import { type ReportIncidentColumn } from './schema'
import UpdateIncidentStatusForm from './update-status-report'

interface ReportActionsProps {
  report: ReportIncidentColumn
}

export function ReportActions({ report }: ReportActionsProps) {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  return (
    <>
      <ReportActionsDropdown
        open={openDropdown}
        onOpenChange={setOpenDropdown}
        onViewDetails={() => router.push(`/dashboard/report-incident/${report.id}`)}
        onEdit={() => setOpenSheet(true)}
      />

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="right" className="w-[600px] sm:w-[800px]">
          <DialogHeader>
            <DialogTitle>Update Report</DialogTitle>
            <DialogDescription>
              Modify the selected Report details.
            </DialogDescription>
          </DialogHeader>

          <UpdateIncidentStatusForm id={report.id} />
        </SheetContent>
      </Sheet>
    </>
  )
}
