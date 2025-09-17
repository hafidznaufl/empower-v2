/* eslint-disable */

'use client'

import { Image } from 'lucide-react'
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

const ImagePlaceholderToolbar = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, onClick, children, ...props }, ref) => {
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
              editor?.isActive('image-placeholder') && 'bg-accent',
              className,
            )}
            onClick={(e) => {
              editor?.chain().focus().insertImagePlaceholder().run()
              onClick?.(e)
              e.preventDefault()
            }}
            ref={ref}
            {...props}
          >
            {children ?? <Image className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Image</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})

ImagePlaceholderToolbar.displayName = 'ImagePlaceholderToolbar'

export { ImagePlaceholderToolbar }
