/* eslint-disable */

'use client'

import { Button } from '~/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { ScrollArea } from '~/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { useToolbar } from '~/components/toolbars/toolbar-provider'
import type { Extension } from '@tiptap/core'
import type { ColorOptions } from '@tiptap/extension-color'
import type { HighlightOptions } from '@tiptap/extension-highlight'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '~/utils/cn'

type TextStylingExtensions =
  | Extension<ColorOptions, any>
  | Extension<HighlightOptions, any>

const TEXT_COLORS = [
  { name: 'Default', color: 'var(--text-default)' },
  { name: 'Gray', color: 'var(--text-gray)' },
  { name: 'Brown', color: 'var(--text-brown)' },
  { name: 'Orange', color: 'var(--text-orange)' },
  { name: 'Yellow', color: 'var(--text-yellow)' },
  { name: 'Green', color: 'var(--text-green)' },
  { name: 'Blue', color: 'var(--text-blue)' },
  { name: 'Purple', color: 'var(--text-purple)' },
  { name: 'Pink', color: 'var(--text-pink)' },
  { name: 'Red', color: 'var(--text-red)' },
]

interface ColorHighlightButtonProps {
  name: string
  color: string
  isActive: boolean
  onClick: () => void
  isHighlight?: boolean
}

const ColorHighlightButton = ({
  name,
  color,
  isActive,
  onClick,
  isHighlight,
}: ColorHighlightButtonProps) => (
  <button
    onClick={onClick}
    className="hover:bg-gray-3 flex w-full items-center justify-between rounded-sm px-2 py-1 text-sm"
    type="button"
  >
    <div className="flex items-center space-x-2">
      <div
        className="rounded-sm border px-1 py-px font-medium"
        style={isHighlight ? { backgroundColor: color } : { color }}
      >
        A
      </div>
      <span>{name}</span>
    </div>
    {isActive && <Check className="h-4 w-4" />}
  </button>
)

export const ColorToolbar = () => {
  const { editor } = useToolbar()

  const currentColor = editor?.getAttributes('textStyle').color

  const handleSetColor = (color: string) => {
    if (color === 'var(--text-default)') {
      editor.chain().focus().unsetColor().run()
    } else {
      editor
        ?.chain()
        .focus()
        .setColor(color === currentColor ? '' : color)
        .run()
    }
  }

  const isDisabled =
    !editor?.can().chain().setHighlight().run() ||
    !editor?.can().chain().setColor('').run()

  return (
    <Popover>
      <div className="relative h-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger disabled={isDisabled} asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  style={{
                    color: currentColor,
                  }}
                  className={cn('h-8 w-14 p-0 font-normal')}
                >
                  <span className="text-md w- h-4">A</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>Text Color</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <PopoverContent align="start" className="dark:bg-gray-2 w-56 p-1">
          <ScrollArea className="max-h-80 overflow-y-auto pr-2">
            <div className="text-gray-11 mb-2.5 mt-2 px-2 text-xs">Color</div>
            {TEXT_COLORS.map(({ name, color }) => (
              <ColorHighlightButton
                key={name}
                name={name}
                color={color}
                isActive={currentColor === color}
                onClick={() => handleSetColor(color)}
              />
            ))}
          </ScrollArea>
        </PopoverContent>
      </div>
    </Popover>
  )
}
