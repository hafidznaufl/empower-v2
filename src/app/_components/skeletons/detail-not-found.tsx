import { AlertTriangle } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface DetailNotFoundProps {
  description?: string
}

export default function DetailNotFound({description = 'Data'}: DetailNotFoundProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10 text-center text-muted-foreground">
      <AlertTriangle className="h-10 w-10 text-destructive" />
      <h2 className="text-xl font-semibold text-foreground">
        Data tidak ditemukan
      </h2>
      <p className="max-w-md text-sm">
        {`${description} yang kamu cari tidak ditemukan. Mungkin sudah dihapus atau ID-nya salah.`}
      </p>
      <Button variant="outline">{`Kembali ke daftar ${description}`}</Button>
    </div>
  )
}
