import { Package } from 'lucide-react'

export function SuspenseFallback() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
        <Package className="absolute inset-0 m-auto h-6 w-6 text-primary" />
      </div>
      <p className="mt-4 animate-pulse text-center text-sm font-medium text-muted-foreground">
        We’re preparing your experience. Just a moment...
      </p>
    </div>
  )
}
