'use client'

import { UnderlineIcon } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { useToolbar } from '~/components/toolbars/toolbar-provider'
import { cn } from '~/utils/cn'

const UnderlineToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8',
                editor?.isActive('underline') && 'bg-accent',
                className,
              )}
              onClick={(e) => {
                editor?.chain().focus().toggleUnderline().run()
                onClick?.(e)
                e.preventDefault()
              }}
              disabled={!editor?.can().chain().focus().toggleUnderline().run()}
              ref={ref}
              {...props}
            >
              {children ?? <UnderlineIcon className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Underline</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)

UnderlineToolbar.displayName = 'UnderlineToolbar'

export { UnderlineToolbar }
