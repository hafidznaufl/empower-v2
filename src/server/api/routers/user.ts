import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string().email(),
        name: z.string().min(1),
        role: z.enum(['CLIENT', 'ADMIN']),
        avatarURL: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.user.findFirst({
        where: {
          OR: [{ id: input.id }, { email: input.email }],
        },
      })

      if (existing) return existing

      const user = await ctx.db.user.create({
        data: {
          id: input.id,
          email: input.email,
          password: 'CREDENTIALS_NOT_REQUIRED',
          name: input.name,
          role: input.role,
          avatarURL: input.avatarURL ?? null,
        },
      })

      return user
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      where: {
        deletedAt: null,
      },
    })

    return users
  }),
})
