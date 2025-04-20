import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'

export default function EventSkeletonLoader() {
  return (
    <div className="container mx-auto mt-10">
      <div className="mb-4">
        <Skeleton className="mb-4 h-8 w-32 border" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              className="hidden shadow-none md:flex md:flex-col"
            >
              <Skeleton className="h-48 w-full" />

              <CardHeader>
                <Skeleton className="w-3/3 mb-2 h-6" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>

              <CardContent>
                <Skeleton className="mb-1 h-4 w-full" />
                <Skeleton className="mb-1 h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>

              <CardFooter className="flex items-center gap-4">
                <Skeleton className="h-10 w-10" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </CardFooter>
            </Card>
          ))}
          {[...Array(1)].map((_, index) => (
            <Card key={index} className="flex flex-col shadow-none md:hidden">
              <Skeleton className="h-48 w-full" />

              <CardHeader>
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>

              <CardContent>
                <Skeleton className="mb-1 h-4 w-full" />
                <Skeleton className="mb-1 h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>

              <CardFooter className="flex items-center gap-4">
                <Skeleton className="h-10 w-10" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
