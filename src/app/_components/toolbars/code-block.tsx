'use client'

import { Code, Code2 } from 'lucide-react'
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

const CodeBlockToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
                editor?.isActive('codeBlock') && 'bg-accent',
                className,
              )}
              onClick={(e) => {
                editor?.chain().focus().toggleCodeBlock().run()
                onClick?.(e)
              }}
              disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
              ref={ref}
              {...props}
            >
              {children || <Code className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Code Block</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)

CodeBlockToolbar.displayName = 'CodeBlockToolbar'

export { CodeBlockToolbar }
