import { PackagePlus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import { type ReactNode } from 'react'

interface TableSheetProps {
  buttonContent: string
  title: string
  description?: string
  children: ReactNode
  icon?: ReactNode
  buttonSize?: 'sm' | 'lg' | 'default' | 'icon' | null
  buttonVariant?: 'default' | 'secondary' | 'outline' | 'link' | 'ghost'
  button?: boolean
}

export default function TableSheet({
  buttonContent,
  title,
  description,
  children,
  icon = <PackagePlus className="h-4 w-4" />,
  buttonSize = 'sm',
  buttonVariant = 'default',
  button = true,
}: TableSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {button ? (
          <Button
            size={buttonSize}
            variant={buttonVariant}
            className="flex items-center gap-2"
          >
            {icon}
            {buttonContent}
          </Button>
        ) : (
          <p className="flex items-center gap-2">
            {icon}
            {buttonContent}
          </p>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
