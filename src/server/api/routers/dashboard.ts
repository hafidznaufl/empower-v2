import { subMonths, startOfMonth, endOfMonth } from 'date-fns'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const dashboardRouter = createTRPCRouter({
  getReportMonthlyStats: publicProcedure.query(async ({ ctx }) => {
    try {
      const sixMonthsAgo = subMonths(new Date(), 6)

      const now = new Date()
      const startThisMonth = startOfMonth(now)
      const endThisMonth = endOfMonth(now)

      const startLastMonth = startOfMonth(subMonths(now, 1))
      const endLastMonth = endOfMonth(subMonths(now, 1))

      const reports = await ctx.db.reportIncident.findMany({
        where: {
          deletedAt: null,
          createdAt: {
            gte: sixMonthsAgo,
          },
        },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          dayOfBirth: true,
          gender: true,
          studyProgram: true,
          semester: true,
          contact: true,
          willingToBeContacted: true,
          incidentDescription: true,
          fileURL: true,
          reportStatus: true,
          createdAt: true,
          deletedAt: true,
          updatedAt: true,
        },
      })

      const thisMonthCount = await ctx.db.reportIncident.count({
        where: {
          deletedAt: null,
          createdAt: {
            gte: startThisMonth,
            lte: endThisMonth,
          },
        },
      })

      const lastMonthCount = await ctx.db.reportIncident.count({
        where: {
          deletedAt: null,
          createdAt: {
            gte: startLastMonth,
            lte: endLastMonth,
          },
        },
      })

      return {
        reports,
        thisMonthCount,
        lastMonthCount,
        diff: thisMonthCount - lastMonthCount,
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error)
      throw new Error('Failed to fetch reports. Please try again.')
    }
  }),

  getBlogMonthlyStats: publicProcedure.query(async ({ ctx }) => {
    const now = new Date()
    const startThisMonth = startOfMonth(now)
    const endThisMonth = endOfMonth(now)

    const startLastMonth = startOfMonth(subMonths(now, 1))
    const endLastMonth = endOfMonth(subMonths(now, 1))

    const thisMonthCount = await ctx.db.blog.count({
      where: {
        deletedAt: null,
        createdAt: {
          gte: startThisMonth,
          lte: endThisMonth,
        },
      },
    })

    const lastMonthCount = await ctx.db.blog.count({
      where: {
        deletedAt: null,
        createdAt: {
          gte: startLastMonth,
          lte: endLastMonth,
        },
      },
    })

    return {
      thisMonthCount,
      lastMonthCount,
      diff: thisMonthCount - lastMonthCount,
    }
  }),

  getEventMonthlyStats: publicProcedure.query(async ({ ctx }) => {
    const now = new Date()
    const startThisMonth = startOfMonth(now)
    const endThisMonth = endOfMonth(now)

    const startLastMonth = startOfMonth(subMonths(now, 1))
    const endLastMonth = endOfMonth(subMonths(now, 1))

    const thisMonthCount = await ctx.db.event.count({
      where: {
        deletedAt: null,
        createdAt: {
          gte: startThisMonth,
          lte: endThisMonth,
        },
      },
    })

    const lastMonthCount = await ctx.db.event.count({
      where: {
        deletedAt: null,
        createdAt: {
          gte: startLastMonth,
          lte: endLastMonth,
        },
      },
    })

    return {
      thisMonthCount,
      lastMonthCount,
      diff: thisMonthCount - lastMonthCount,
    }
  }),

  getUserMonthlyStats: publicProcedure.query(async ({ ctx }) => {
    const now = new Date()
    const startThisMonth = startOfMonth(now)
    const endThisMonth = endOfMonth(now)

    const startLastMonth = startOfMonth(subMonths(now, 1))
    const endLastMonth = endOfMonth(subMonths(now, 1))

    const thisMonthCount = await ctx.db.user.count({
      where: {
        deletedAt: null,
        createdAt: {
          gte: startThisMonth,
          lte: endThisMonth,
        },
      },
    })

    const lastMonthCount = await ctx.db.user.count({
      where: {
        deletedAt: null,
        createdAt: {
          gte: startLastMonth,
          lte: endLastMonth,
        },
      },
    })

    return {
      thisMonthCount,
      lastMonthCount,
      diff: thisMonthCount - lastMonthCount,
    }
  }),
})
