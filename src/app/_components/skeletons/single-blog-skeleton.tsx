import { Skeleton } from '~/components/ui/skeleton'

export default function SingleBlogSkeletonLoader() {
  return (
    <div className="container mx-auto space-y-6 p-4">
      {/* Judul */}
      <Skeleton className="h-10 w-3/4 rounded-md" />

      {/* Gambar utama */}
      <Skeleton className="h-64 w-full rounded-md" />

      {/* Info tambahan (penulis, tanggal, kategori) */}
      <div className="flex gap-4">
        <Skeleton className="h-6 w-1/4 rounded-md" />
        <Skeleton className="h-6 w-1/6 rounded-md" />
        <Skeleton className="h-6 w-1/5 rounded-md" />
      </div>

      {/* Konten artikel */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-6 w-5/6 rounded-md" />
        <Skeleton className="h-6 w-2/3 rounded-md" />
      </div>

      {/* Paragraf tambahan */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-6 w-4/5 rounded-md" />
        <Skeleton className="h-6 w-3/4 rounded-md" />
      </div>

      {/* Gambar tambahan */}
      <Skeleton className="h-48 w-full rounded-md" />

      {/* Footer (tags atau share button) */}
      <div className="flex gap-4">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-6 w-4/5 rounded-md" />
        <Skeleton className="h-6 w-3/4 rounded-md" />
      </div>
      
      <Skeleton className="h-48 w-full rounded-md" />
    </div>
  )
}
