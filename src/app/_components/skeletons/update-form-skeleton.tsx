import { Skeleton } from '~/components/ui/skeleton'

export default function UpdateFormSkeleton() {
  return (
    <div className="space-y-4 rounded-lg shadow-md">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  )
}
