import { z } from 'zod'

export const blogStatusEnum = z.enum(['PENDING', 'PUBLISHED', 'ARCHIVED'])
export const blogCategoryEnum = z.enum(['NEWS', 'BLOG', 'PRESS_RELEASE'])

export const blogSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title cannot exceed 255 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters'),
  content: z.any(),
  category: blogCategoryEnum.default('NEWS'),
  thumbnailURL: z.string().url('Invalid thumbnail URL').optional(),
  authorId: z.string(),
  blogStatus: blogStatusEnum.default('PENDING'),
  createdAt: z
    .union([z.date(), z.string()])
    .transform((val) => new Date(val))
    .optional(),
})

export const blogSchemaColumn = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title cannot exceed 255 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters'),
  content: z.any(),
  category: blogCategoryEnum,
  thumbnailURL: z.string().url('Invalid thumbnail URL').nullable(),
  authorName: z.string(),
  blogStatus: blogStatusEnum,
  createdAt: z.union([z.date(), z.string()]).transform((val) => new Date(val)),
  updatedAt: z.union([z.date(), z.string()]).transform((val) => new Date(val)),
})

export type Blog = z.infer<typeof blogSchema>
export type BlogColumn = z.infer<typeof blogSchemaColumn>
