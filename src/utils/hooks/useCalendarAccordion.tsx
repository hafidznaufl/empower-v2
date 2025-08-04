'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'
import { Calendar } from '~/app/_components/ui/calendar'
import { CalendarIcon } from 'lucide-react'

interface UseCalendarAccordionOptions {
  initialDate?: Date
  fromYear?: number
  toYear?: number
  onSelect: (date: Date) => void
}

export function useCalendarAccordion({
  initialDate = new Date(),
  fromYear = 1970,
  toYear = new Date().getFullYear() + 2,
  onSelect,
}: UseCalendarAccordionOptions) {
  const [open, setOpen] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const handleSelect = useCallback(
    (date: Date | undefined) => {
      if (date) {
        setSelectedDate(date)
        onSelect(date)
        setOpen('')
      }
    },
    [onSelect],
  )

  useEffect(() => {
    if (open === '') {
      triggerRef.current?.focus()
    }
  }, [open])

  const withAccordion = (label: string) => (
    <Accordion
      type="single"
      collapsible
      value={open}
      onValueChange={setOpen}
      className="w-full"
    >
      <AccordionItem value="date-picker" className="rounded-md border px-2">
        <AccordionTrigger>
          <div className="flex w-full cursor-pointer items-center justify-between px-2 text-left font-normal">
            <span>{label}</span>
            <CalendarIcon className="ml-2 h-4 w-4 text-muted-foreground" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-3 pb-3">
          <Calendar
            mode="single"
            captionLayout="buttons"
            fromYear={fromYear}
            toYear={toYear}
            defaultMonth={initialDate}
            selected={selectedDate}
            onSelect={handleSelect}
            initialFocus
            className="rounded-md border-0"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )

  return {
    open: open === 'date-picker',
    setOpen,
    selectedDate,
    withAccordion,
  }
}
