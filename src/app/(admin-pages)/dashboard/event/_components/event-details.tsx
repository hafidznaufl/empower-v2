'use client'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  ImageIcon,
  ChevronsLeft,
  Info,
} from 'lucide-react'
import Image from 'next/image'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { useRouter } from 'next/navigation'
import { env } from '~/env'

interface EventDetailProps {
  redirectUrl?: string
  event: {
    id: string
    title: string
    description: string
    date: Date
    timeStart: Date
    timeEnd: Date
    location: string
    room: string
    capacity: string
    thumbnailURL?: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
  }
}

export function EventDetail({ redirectUrl, event }: EventDetailProps) {
  const router = useRouter()

  const formatTime = (date: Date) => {
    return format(date, 'HH:mm')
  }

  const calculateDuration = () => {
    const durationMs = event.timeEnd.getTime() - event.timeStart.getTime()
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0 && minutes > 0) {
      return `${hours} jam ${minutes} menit`
    } else if (hours > 0) {
      return `${hours} jam`
    } else {
      return `${minutes} menit`
    }
  }

  return (
    <div className="container mx-auto mt-20 space-y-4 px-4">
      <Card className="shadow-none">
        <CardHeader className="border-b pb-4 pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <FileText className="h-5 w-5" />
              Detail Acara
            </CardTitle>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1">
                <Calendar className="h-4 w-4 opacity-80" />
                <span className="font-medium">
                  {format(event.date, 'eeee, dd MMMM yyyy', {
                    locale: id,
                  })}
                </span>
              </div>
              <Badge className="px-3 py-1 font-medium">
                {formatTime(event.timeStart)} - {formatTime(event.timeEnd)}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              {event.thumbnailURL ? (
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={
                      env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL +
                        event.thumbnailURL || '/placeholder.svg'
                    }
                    alt={event.title}
                    width={1920}
                    height={1080}
                    className="h-[350px] w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex h-[300px] w-full items-center justify-center rounded-lg bg-accent">
                  <ImageIcon className="h-16 w-16 text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Tidak ada gambar</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 border-l-4 border-primary pl-2">
                <Info className="h-5 w-5" />
                <h3 className="text-lg font-semibold tracking-tight">
                  Informasi Acara
                </h3>
              </div>

              <div className="rounded-lg bg-accent p-5 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold">{event.title}</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Tanggal
                      </p>
                      <p className="font-medium">
                        {format(event.date, 'eeee, dd MMMM yyyy', {
                          locale: id,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Waktu
                      </p>
                      <p className="font-medium">
                        {formatTime(event.timeStart)} -{' '}
                        {formatTime(event.timeEnd)} ({calculateDuration()})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Lokasi
                      </p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Ruangan
                      </p>
                      <p className="font-medium">{event.room}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <Users className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Kapasitas
                      </p>
                      <p className="font-medium">{event.capacity} orang</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 border-l-4 border-primary pl-2">
              <FileText className="h-5 w-5" />
              <h3 className="text-lg font-semibold tracking-tight">
                Deskripsi Acara
              </h3>
            </div>

            <div className="rounded-lg bg-accent p-5 shadow-sm">
              <p className="whitespace-pre-wrap leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border bg-accent p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="mr-1 font-medium">ID Acara:</span>
                <Badge>{event.id}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  Dibuat pada:{' '}
                  {format(event.createdAt, 'dd MMMM yyyy, HH:mm', {
                    locale: id,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  Diperbarui pada:{' '}
                  {format(event.updatedAt, 'dd MMMM yyyy, HH:mm', {
                    locale: id,
                  })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button
          onClick={() => router.push(redirectUrl ?? '/dashboard/event')}
          className="rounded-2xl"
        >
          <ChevronsLeft className="mr-2 h-4 w-4" />
          Kembali ke Daftar Acara
        </Button>
      </div>
    </div>
  )
}
