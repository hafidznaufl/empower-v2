import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const blogRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(5, { message: 'Title must be at least 5 characters long.' })
          .max(255, { message: 'Title cannot be longer than 255 characters.' })
          .trim(),
        description: z
          .string()
          .min(10, {
            message: 'Description must be at least 10 characters long.',
          })
          .max(500, {
            message: 'Description cannot be longer than 500 characters.',
          })
          .trim(),
        content: z
          .string()
          .min(50, { message: 'Content must be at least 50 characters long.' })
          .regex(/[^\s]/, {
            message: 'Content cannot be empty or just whitespace.',
          })
          .trim(),
        category: z.enum(['BLOG', 'NEWS', 'PRESS_RELEASE']),
        blogStatus: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
        thumbnail: z.string().optional(),
        authorId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log('Creating blog with input:', input)
        return await ctx.db.blog.create({
          data: {
            title: input.title,
            description: input.description,
            content: input.content,
            category: input.category,
            thumbnailURL: input.thumbnail ?? null,
            authorId: input.authorId ?? undefined,
            blogStatus: 'PENDING',
          },
        })
      } catch (error) {
        console.error('Failed to create blog:', error)
        throw new Error('Failed to create blog. Please try again.')
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().optional(),
        description: z.string().optional(),
        content: z.string().optional(),
        thumbnail: z.string().url().optional(),
        category: z.enum(['BLOG', 'NEWS', 'PRESS_RELEASE']).optional(),
        blogStatus: z.enum(['PENDING', 'PUBLISHED', 'ARCHIVED']).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.blog.update({
          where: { id: input.id, deletedAt: null },
          data: {
            title: input.title,
            description: input.description,
            content: input.content,
            category: input.category,
            thumbnailURL: input.thumbnail,
            blogStatus: input.blogStatus,
          },
        })
      } catch (error) {
        console.error('Failed to update blog:', error)
        throw new Error('Failed to update blog. Please try again.')
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.blog.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          thumbnailURL: true,
          blogStatus: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarURL: true,
            },
          },
        },
      })
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
      throw new Error('Failed to fetch blogs. Please try again.')
    }
  }),

  getAllPublished: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.blog.findMany({
        where: { deletedAt: null, blogStatus: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          thumbnailURL: true,
          blogStatus: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarURL: true,
            },
          },
        },
      })
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
      throw new Error('Failed to fetch blogs. Please try again.')
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      try {
        const blog = await ctx.db.blog.findUnique({
          where: { id: input.id, deletedAt: null },
          include: {
            author: {
              select: { id: true, name: true, email: true, avatarURL: true },
            },
          },
        })
        if (!blog) throw new Error('Blog not found')
        return blog
      } catch (error) {
        console.error('Failed to fetch blog:', error)
        throw new Error('Failed to fetch blog. Please try again.')
      }
    }),

  getByAuthorId: publicProcedure
    .input(z.object({ authorId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.blog.findMany({
          where: {
            authorId: input.authorId,
            deletedAt: null,
          },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            thumbnailURL: true,
            blogStatus: true,
            createdAt: true,
            updatedAt: true,
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarURL: true,
              },
            },
          },
        })
      } catch (error) {
        console.error('Failed to fetch blogs by author:', error)
        throw new Error('Failed to fetch blogs by author. Please try again.')
      }
    }),

  deleteMany: publicProcedure
    .input(z.object({ ids: z.array(z.string().uuid()) }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.blog.updateMany({
          where: { id: { in: input.ids } },
          data: { deletedAt: new Date() },
        })
      } catch (error) {
        console.error('Failed to delete blogs:', error)
        throw new Error('Failed to delete blogs. Please try again.')
      }
    }),
})
