'use client'

import { Subscript } from 'lucide-react'
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

const SubscriptToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
                editor?.isActive('subscript') && 'bg-accent',
                className,
              )}
              onClick={(e) => {
                editor?.chain().focus().toggleSubscript().run()
                onClick?.(e)
                e.preventDefault()
              }}
              disabled={!editor?.can().chain().focus().toggleSubscript().run()}
              ref={ref}
              {...props}
            >
              {children ?? <Subscript className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Subscript</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)

SubscriptToolbar.displayName = 'SubscriptToolbar'

export { SubscriptToolbar }
