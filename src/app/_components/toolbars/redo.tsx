'use client'

import { CornerUpRight } from 'lucide-react'
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

const RedoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
                editor?.chain().focus().redo().run()
                onClick?.(e)
              }}
              disabled={!editor?.can().chain().focus().redo().run()}
              ref={ref}
              {...props}
            >
              {children || <CornerUpRight className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Redo</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)

RedoToolbar.displayName = 'RedoToolbar'

export { RedoToolbar }
