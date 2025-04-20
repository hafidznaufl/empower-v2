import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const eventRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        date: z.date(),
        timeStart: z.date(),
        timeEnd: z.date(),
        location: z.string().min(1),
        room: z.string().min(1),
        capacity: z.string().min(1),
        thumbnailURL: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.event.create({
          data: {
            title: input.title,
            description: input.description,
            date: input.date,
            timeStart: input.timeStart,
            timeEnd: input.timeEnd,
            location: input.location,
            room: input.room,
            capacity: input.capacity,
            thumbnailURL: input.thumbnailURL,
          },
        })
      } catch (error) {
        console.error('Failed to create event:', error)
        throw new Error('Failed to create event. Please try again.')
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.event.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
      })
    } catch (error) {
      console.error('Failed to fetch events:', error)
      throw new Error('Failed to fetch events. Please try again.')
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      try {
        const event = await ctx.db.event.findUnique({
          where: { id: input.id },
        })

        if (!event || event.deletedAt) throw new Error('Event not found')
        return event
      } catch (error) {
        console.error('Failed to fetch event:', error)
        throw new Error('Failed to fetch event. Please try again.')
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.date().optional(),
        timeStart: z.date().optional(),
        timeEnd: z.date().optional(),
        location: z.string().optional(),
        room: z.string().optional(),
        capacity: z.string().optional(),
        thumbnailURL: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.event.update({
          where: { id: input.id, deletedAt: null },
          data: {
            title: input.title,
            description: input.description,
            date: input.date,
            timeStart: input.timeStart,
            timeEnd: input.timeEnd,
            location: input.location,
            room: input.room,
            capacity: input.capacity,
            thumbnailURL: input.thumbnailURL ?? undefined,
          },
        })
      } catch (error) {
        console.error('Failed to update event:', error)
        throw new Error('Failed to update event. Please try again.')
      }
    }),

  deleteMany: publicProcedure
    .input(z.object({ ids: z.array(z.string().uuid()) }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.event.updateMany({
          where: { id: { in: input.ids } },
          data: { deletedAt: new Date() },
        })
      } catch (error) {
        console.error('Failed to delete events:', error)
        throw new Error('Failed to delete events. Please try again.')
      }
    }),
})
