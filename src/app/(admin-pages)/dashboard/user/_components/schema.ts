import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['ADMIN', 'CLIENT']),
})

export const userSchemaColumn = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  emailVerified: z.string().optional(),
  role: z.enum(['ADMIN', 'CLIENT']),
  createdAt: z.string(),
  lastSignIn: z.string().optional(),
})

export type UserColumn = z.infer<typeof userSchemaColumn>
