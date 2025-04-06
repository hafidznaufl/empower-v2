import { z } from 'zod'

export const editProfileSchema = z.object({
  userId: z.string().uuid(),
  nik: z
    .string()
    .length(16, 'NIK must be exactly 16 digits long')
    .regex(/^\d+$/, 'NIK must contain only numbers'),
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  birthDate: z.coerce.date(),
  gender: z.enum(['MALE', 'FEMALE']),
  phone: z.string().min(10, 'Phone number is not valid'),
})
