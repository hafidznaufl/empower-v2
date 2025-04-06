'use client'

import { Button, type ButtonProps } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { useToolbar } from '~/components/toolbars/toolbar-provider'
import { CornerUpLeft } from 'lucide-react'
import React from 'react'
import { cn } from '~/utils/cn'

const UndoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn('h-8 w-8', className)}
              onClick={(e) => {
                editor?.chain().focus().undo().run()
                onClick?.(e)
              }}
              disabled={!editor?.can().chain().focus().undo().run()}
              ref={ref}
              {...props}
            >
              {children || <CornerUpLeft className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Undo</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)

UndoToolbar.displayName = 'UndoToolbar'

export { UndoToolbar }
