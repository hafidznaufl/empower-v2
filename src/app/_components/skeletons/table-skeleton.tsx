import { Skeleton } from '~/components/ui/skeleton'
import { Separator } from '../ui/separator'

export default function TableSkeleton({ rowCount = 10 }) {
  return (
    <div className="mt-4 w-full space-y-4 px-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-1/4" />
        <div className="flex gap-4">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="grid grid-cols-8 gap-4 px-4 py-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
        <Separator />
        {Array.from({ length: rowCount }).map((_, index) => (
          <div
            key={index}
            className="grid animate-pulse grid-cols-8 gap-4 border-b px-4 py-3"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
