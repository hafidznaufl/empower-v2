import { Skeleton } from '~/components/ui/skeleton'

export default function EventDetailSkeleton() {
  return (
    <div className="container mx-auto mt-20">
      <div className="space-y-4 px-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-[400px] w-full rounded-md" />
        <Skeleton className="h-4 w-1/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  )
}
