'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '~/components/ui/badge'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { id } from 'date-fns/locale'
import { api } from '~/trpc/react'
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react'
import EventSkeletonLoader from '~/app/_components/skeletons/event-skeleton'
export default function EventList() {
  const { data: events, isLoading, isError } = api.event.getAll.useQuery()

  if (isLoading) {
    return (
      <div className="mt-20 px-4">
        <EventSkeletonLoader />
        <EventSkeletonLoader />
        <EventSkeletonLoader />
      </div>
    )
  }

  if (isError || !events) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">
          Failed to load event content. Please try again later.
        </p>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No events found</p>
      </div>
    )
  }

  const getEventStatus = (event: any) => {
    const now = new Date()
    const eventDate = new Date(event.date)

    const startDateTime = new Date(event.date)
    startDateTime.setHours(
      event.timeStart.getHours(),
      event.timeStart.getMinutes(),
      0,
      0,
    )

    const endDateTime = new Date(event.date)
    endDateTime.setHours(
      event.timeEnd.getHours(),
      event.timeEnd.getMinutes(),
      0,
      0,
    )

    if (now < startDateTime) {
      return {
        status: 'upcoming',
        label: 'Akan Datang',
        color: 'bg-blue-500 text-white',
      }
    } else if (now > endDateTime) {
      return {
        status: 'past',
        label: 'Sudah Berlalu',
        color: 'bg-gray-500 text-white',
      }
    } else {
      return {
        status: 'ongoing',
        label: 'Sedang Berlangsung',
        color: 'bg-green-500 text-white',
      }
    }
  }

  const groupedEvents = events.reduce(
    (acc, event) => {
      const status = getEventStatus(event).status
      if (!acc[status]) acc[status] = []
      acc[status]?.push(event)
      return acc
    },
    {} as Record<string, typeof events>,
  )

  if (groupedEvents.upcoming) {
    groupedEvents.upcoming.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  }

  const statusOrder = ['ongoing', 'upcoming', 'past']
  const statusLabels = {
    ongoing: 'Sedang Berlangsung',
    upcoming: 'Akan Datang',
    past: 'Sudah Berlalu',
  }

  return (
    <div className="container mx-auto mt-20 space-y-12 px-4">
      {statusOrder.map((status) => {
        const eventList = groupedEvents[status]
        if (!eventList || eventList.length === 0) return null

        return (
          <div key={status} className="mt-0">
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold capitalize text-gray-800 dark:text-white">
                {statusLabels[status as keyof typeof statusLabels]}
              </h2>
              <Badge
                className={`px-2.5 py-1 text-xs font-medium ${
                  status === 'ongoing'
                    ? 'bg-green-500 text-white'
                    : status === 'upcoming'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-500 text-white'
                }`}
              >
                {eventList.length} acara
              </Badge>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{
                el: `.custom-pagination-${status}`,
                clickable: true,
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {eventList.map((event) => {
                const eventStatus = getEventStatus(event)

                return (
                  <SwiperSlide key={event.id}>
                    <Link href={`/event/${event.id}`}>
                      <Card className="group h-full overflow-hidden border bg-card shadow-none transition-all duration-300">
                        <div className="relative h-48 w-full overflow-hidden">
                          {event.thumbnailURL ? (
                            <Image
                              fill
                              src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL}${event.thumbnailURL}`}
                              alt={event.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-accent/80">
                              <CalendarIcon className="h-16 w-16 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          <Badge
                            className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-medium shadow-md backdrop-blur-sm ${eventStatus.color}`}
                          >
                            {eventStatus.label}
                          </Badge>
                        </div>

                        <CardHeader className="px-5 pb-2 pt-5">
                          <CardTitle className="line-clamp-2 text-xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary">
                            {event.title}
                          </CardTitle>
                          <CardDescription className="mt-2 flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                            <CalendarIcon className="h-4 w-4" />
                            {format(
                              new Date(event.date),
                              'eeee, dd MMMM yyyy',
                              {
                                locale: id,
                              },
                            )}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3 px-5 pb-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>
                              {format(new Date(event.timeStart), 'HH:mm')} -{' '}
                              {format(new Date(event.timeEnd), 'HH:mm')}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="line-clamp-1">
                              {event.location} • {event.room}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Kapasitas: {event.capacity} orang</span>
                          </div>
                        </CardContent>

                        <CardFooter className="mt-auto flex items-center justify-between border-t border-gray-100 px-5 py-4 dark:border-gray-800">
                          <p className="line-clamp-1 max-w-[80%] text-sm">
                            {event.description}
                          </p>
                          <Badge variant="outline" className="ml-auto">
                            Detail
                          </Badge>
                        </CardFooter>
                      </Card>
                    </Link>
                  </SwiperSlide>
                )
              })}
              <div
                className={`custom-pagination-${status} mt-6 flex justify-center`}
              />
            </Swiper>
          </div>
        )
      })}
    </div>
  )
}
