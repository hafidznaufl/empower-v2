import { create } from 'zustand'
import { type z } from 'zod'
import { type bookingSchema } from '~/app/(client-public-pages)/_components/schemas'

type BookingState = {
  bookingData: z.infer<typeof bookingSchema> | null
  setBookingData: (data: z.infer<typeof bookingSchema>) => void
}

export const useBookingStore = create<BookingState>((set) => ({
  bookingData: null,
  setBookingData: (data) => set({ bookingData: data }),
}))
