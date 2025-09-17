'use client'
import { useState, useEffect } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '~/components/ui/popover'
import { Button } from '~/components/ui/button'
import { cn } from '~/utils/cn'
import { Clock, ChevronUp, ChevronDown } from 'lucide-react'

export default function TimePopover({
  value,
  onChange,
  use24HourFormat = false,
}: {
  value?: Date
  onChange: (d: Date) => void
  use24HourFormat?: boolean
}) {
  const initialDate = value ?? new Date(new Date().setHours(0, 0, 0, 0))
  const [hours, setHours] = useState(initialDate.getHours())
  const [minutes, setMinutes] = useState(initialDate.getMinutes())
  const [period, setPeriod] = useState(
    initialDate.getHours() >= 12 ? 'PM' : 'AM',
  )

  useEffect(() => {
    if (value) {
      setHours(value.getHours())
      setMinutes(value.getMinutes())
      setPeriod(value.getHours() >= 12 ? 'PM' : 'AM')
    }
  }, [value])

  const handleTimeChange = (h: number, m: number, p?: string) => {
    let newHours = h

    if (!use24HourFormat && p) {
      if (p === 'PM' && newHours < 12) {
        newHours += 12
      } else if (p === 'AM' && newHours === 12) {
        newHours = 0
      }
    }

    setHours(newHours)
    setMinutes(m)

    const newDate = value ? new Date(value) : new Date()
    newDate.setHours(newHours)
    newDate.setMinutes(m)
    newDate.setSeconds(0)
    onChange(newDate)
  }

  const adjustHours = (increment: boolean) => {
    let newHours
    if (use24HourFormat) {
      newHours = (hours + (increment ? 1 : 23)) % 24
    } else {
      const h12 = hours % 12 === 0 ? 12 : hours % 12
      newHours = (h12 + (increment ? 1 : 11)) % 12
      if (newHours === 0) newHours = 12

      if (period === 'PM' && newHours < 12) {
        newHours += 12
      } else if (period === 'AM' && newHours === 12) {
        newHours = 0
      }
    }

    handleTimeChange(newHours, minutes, period)
  }

  const adjustMinutes = (increment: boolean) => {
    const newMinutes = (minutes + (increment ? 5 : 55)) % 60
    handleTimeChange(hours, newMinutes, period)
  }

  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM'

    let newHours = hours
    if (newPeriod === 'AM' && hours >= 12) {
      newHours = hours - 12
    } else if (newPeriod === 'PM' && hours < 12) {
      newHours = hours + 12
    }

    setPeriod(newPeriod)
    handleTimeChange(newHours, minutes, newPeriod)
  }

  const formatDisplayTime = () => {
    if (use24HourFormat) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    } else {
      const h12 = hours % 12 === 0 ? 12 : hours % 12
      return `${h12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex w-auto min-w-full items-center justify-between text-left font-mono',
            !value && 'text-muted-foreground',
          )}
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Set Time</span>
          </div>
          <span className="font-mono text-sm tabular-nums">
            {value
              ? formatDisplayTime()
              : use24HourFormat
                ? '00:00'
                : '12:00 AM'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-[200px] rounded-md border p-0 shadow-lg"
        disablePortal
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <div className="border-b p-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex flex-col items-center space-y-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => adjustHours(true)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center text-2xl font-bold">
                {use24HourFormat
                  ? hours.toString().padStart(2, '0')
                  : (hours % 12 === 0 ? 12 : hours % 12)
                      .toString()
                      .padStart(2, '0')}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => adjustHours(false)}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-2xl font-bold">:</div>

            <div className="flex flex-col items-center space-y-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => adjustMinutes(true)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center text-2xl font-bold">
                {minutes.toString().padStart(2, '0')}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => adjustMinutes(false)}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {!use24HourFormat && (
              <Button
                variant="outline"
                className="h-10 px-3"
                onClick={togglePeriod}
              >
                {period}
              </Button>
            )}
          </div>
        </div>

        <div className="p-2">
          <div className="grid grid-cols-2 gap-1">
            {[0, 15, 30, 45].map((m) => (
              <Button
                key={m}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleTimeChange(hours, m, period)}
              >
                :{m.toString().padStart(2, '0')}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
