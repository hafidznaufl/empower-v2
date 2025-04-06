import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  referralCode: z.string().optional(),
  role: z.enum(['ADMIN', 'CUSTOMER']),
  createdAt: z.date(),
})

export const userSchemaColumn = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  emailVerified: z.string().optional(),
  referralCode: z.string().optional(),
  role: z.enum(['ADMIN', 'CUSTOMER']),
  createdAt: z.string(),
  lastSignIn: z.string().optional(),
})

export type UserColumn = z.infer<typeof userSchemaColumn>
