import { z } from 'zod'

export const voucherSchema = z.object({
  id: z.string().optional(),
  code: z.string().min(3, 'Code must be at least 3 characters'),
  discount: z
    .number()
    .min(1, 'Discount must be at least 1%')
    .max(99, 'Discount cannot exceed 99%'),
  expiryDate: z.union([z.date(), z.string()]).transform((val) => new Date(val)),
  isActive: z.boolean(),
  minTransaction: z
    .number()
    .min(1, 'Minimum transaction must be at least 1')
    .int('Minimum transaction must be a whole number'),
  description: z
    .string()
    .max(500, 'Description must be 500 characters or less')
    .min(3, 'Description must be at least 3 characters long'),
  usageLimit: z
    .number()
    .min(1, 'Usage limit must be at least 1')
    .int('Usage limit must be a whole number'),
})

export const voucherSchemaColumn = z.object({
  id: z.string(),
  code: z.string().min(3, 'Code must be at least 3 characters'),
  discount: z
    .number()
    .min(1, 'Discount must be at least 1%')
    .max(99, 'Discount cannot exceed 99%'),
  expiryDate: z.union([z.date(), z.string()]).transform((val) => new Date(val)),
  isActive: z.boolean(),
  minTransaction: z
    .number()
    .min(1, 'Minimum transaction must be at least 1')
    .int('Minimum transaction must be a whole number'),
  description: z
    .string()
    .max(500, 'Description must be 500 characters or less')
    .min(3, 'Description must be at least 3 characters long'),
  usageLimit: z
    .number()
    .min(1, 'Usage limit must be at least 1')
    .int('Usage limit must be a whole number'),
})

export type VoucherColumn = z.infer<typeof voucherSchemaColumn>
