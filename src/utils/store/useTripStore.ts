import { create } from 'zustand'
import { type z } from 'zod'
import {
  responseSchema,
  tripPostSchema,
} from '~/app/(client-public-pages)/trip/search/_components/schemas'

type TripState = {
  tripData: z.infer<typeof responseSchema> | null
  setTripData: (data: z.infer<typeof responseSchema>) => void
}

export const useTripStore = create<TripState>((set) => ({
  tripData: null,
  setTripData: (data) => set({ tripData: data }),
}))

type TripPostState = {
  tripPostData: z.infer<typeof tripPostSchema> | null
  setTripPostData: (data: z.infer<typeof tripPostSchema>) => void
}

export const useTripPostStore = create<TripPostState>((set) => ({
  tripPostData: null,
  setTripPostData: (data) => set({ tripPostData: data }),
}))
