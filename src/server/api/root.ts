import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc'
import { reportRouter } from '~/server/api/routers/report'
import { blogRouter } from '~/server/api/routers/blog'
import { userRouter } from '~/server/api/routers/user'
import { eventRouter } from '~/server/api/routers/event'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  report: reportRouter,
  blog: blogRouter,
  event: eventRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
