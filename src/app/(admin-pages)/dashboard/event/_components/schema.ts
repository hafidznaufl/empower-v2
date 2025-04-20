import { z } from 'zod'

export const eventSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  date: z.union([z.date(), z.string()]).transform((val) => new Date(val)),
  timeStart: z.union([z.date(), z.string()]).transform((val) => new Date(val)),
  timeEnd: z.union([z.date(), z.string()]).transform((val) => new Date(val)),
  location: z.string().min(1, 'Location is required'),
  room: z.string().min(1, 'Room is required'),
  capacity: z.string().min(1, 'Capacity is required'),
  thumbnailURL: z.string().optional(),
  createdAt: z
    .union([z.date(), z.string()])
    .transform((val) => new Date(val))
    .optional(),
  updatedAt: z
    .union([z.date(), z.string()])
    .transform((val) => new Date(val))
    .optional(),
  deletedAt: z
    .union([z.date(), z.string()])
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),
})

export const eventSchemaColumn = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  date: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  timeStart: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  timeEnd: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  location: z.string(),
  room: z.string(),
  capacity: z.string(),
  thumbnailURL: z.string().url().nullable().optional(),
  createdAt: z.union([z.date(), z.string()]).transform((val) => new Date(val)),
})

export type Event = z.infer<typeof eventSchema>
export type EventColumn = z.infer<typeof eventSchemaColumn>
