'use client'

import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { useToolbar } from '~/components/toolbars/toolbar-provider'
import { Level } from '@tiptap/extension-heading'

export const HeadingToolbar = () => {
  const { editor } = useToolbar()

  const handleSetHeading = (level: number) => {
    if (level === 0) {
      editor?.chain().focus().setParagraph().run()
    } else {
      editor
        ?.chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
        .run()
    }
  }

  const currentHeadingLevel = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor?.isActive('heading', { level: i })) {
        return i
      }
    }
    return 0 as Level
  }

  const headingOptions = [
    { name: 'Heading 1', level: 1, icon: <Heading1 className="h4 w-4" /> },
    { name: 'Heading 2', level: 2, icon: <Heading2 className="h4 w-4" /> },
    { name: 'Heading 3', level: 3, icon: <Heading3 className="h4 w-4" /> },
    { name: 'Heading 4', level: 4, icon: <Heading4 className="h4 w-4" /> },
    { name: 'Heading 5', level: 5, icon: <Heading5 className="h4 w-4" /> },
    { name: 'Heading 6', level: 6, icon: <Heading6 className="h4 w-4" /> },
    { name: 'Paragraph', level: 0, icon: <p className="h-4 w-4">P</p> },
  ]

  const findHeadingIndex = (level: number) => {
    return headingOptions.findIndex((option) => option.level === level)
  }

  const isDisabled =
    !editor || !editor.can().chain().focus().toggleHeading({ level: 1 }).run()

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger disabled={isDisabled} asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-40 justify-between font-normal"
              >
                <span className="mr-2">
                  {
                    headingOptions[findHeadingIndex(currentHeadingLevel())]
                      ?.icon
                  }
                </span>
                {headingOptions[findHeadingIndex(currentHeadingLevel())]?.name}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Heading</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent
        loop
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DropdownMenuGroup className="w-40">
          {headingOptions.map((option, index) => (
            <DropdownMenuItem
              onSelect={() => {
                handleSetHeading(option.level as Level)
              }}
              key={index}
            >
              {option.name}
              {option.level === currentHeadingLevel() && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
