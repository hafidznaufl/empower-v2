import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const reportRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        dateOfBirth: z.date().optional(),
        gender: z.enum(['MALE', 'FEMALE']),
        studyProgram: z.enum([
          'COMPUTER_ENGINEERING',
          'INFORMATION_SYSTEMS',
          'DIGITAL_BUSINESS',
        ]),
        semester: z.string().min(1).max(20),
        contact: z.string().min(9).max(20),
        willingToBeContacted: z.boolean(),
        description: z.string().min(10),
        evidence: z.array(z.any()).optional(),
        reportStatus: z
          .enum([
            'PENDING',
            'IN_PROCESS',
            'PROVEN_LIGHTLY_SACTIONED',
            'PROVEN_MODERATElYY_SACTIONED',
            'PROVEN_SEVERELY_SACTIONED',
          ])
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.reportIncident.create({
          data: {
            name: input.name,
            email: input.email,
            dayOfBirth: input.dateOfBirth ?? new Date(),
            gender: input.gender,
            studyProgram: input.studyProgram,
            semester: input.semester,
            contact: input.contact,
            willingToBeContacted: input.willingToBeContacted,
            incidentDescription: input.description,
            reportStatus: input.reportStatus ?? 'PENDING',
            fileURL: input.evidence ?? [],
          },
        })
      } catch (error) {
        console.error('Failed to create report:', error)
        throw new Error('Failed to create report. Please try again.')
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.reportIncident.findMany({
        where: { deletedAt: null },
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
    } catch (error) {
      console.error('Failed to fetch reports:', error)
      throw new Error('Failed to fetch reports. Please try again.')
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      try {
        const report = await ctx.db.reportIncident.findUnique({
          where: { id: input.id, deletedAt: null },
        })

        if (!report) throw new Error('Report not found')
        return report
      } catch (error) {
        console.error('Failed to fetch report:', error)
        throw new Error('Failed to fetch report. Please try again.')
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        reportStatus: z
          .enum([
            'PENDING',
            'IN_PROCESS',
            'PROVEN_LIGHTLY_SACTIONED',
            'PROVEN_MODERATElYY_SACTIONED',
            'PROVEN_SEVERELY_SACTIONED',
          ])
          .optional(),
        description: z.string().optional(),
        fileURL: z.array(z.any()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.reportIncident.update({
          where: { id: input.id, deletedAt: null },
          data: {
            reportStatus: input.reportStatus,
            incidentDescription: input.description,
            fileURL: input.fileURL ?? [],
          },
        })
      } catch (error) {
        console.error('Failed to update report:', error)
        throw new Error('Failed to update report. Please try again.')
      }
    }),

  deleteMany: publicProcedure
    .input(z.object({ ids: z.array(z.string().uuid()) }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.reportIncident.updateMany({
          where: { id: { in: input.ids } },
          data: { deletedAt: new Date() },
        })
      } catch (error) {
        console.error('Failed to delete reports:', error)
        throw new Error('Failed to delete reports. Please try again.')
      }
    }),
})
