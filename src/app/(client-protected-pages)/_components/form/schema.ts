import { z } from 'zod'

export const reportSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({ message: 'Invalid email address' }),
  dateOfBirth: z.date().optional(),
  gender: z.enum(['MALE', 'FEMALE'], {
    required_error: 'Please select a gender',
  }),
  studyProgram: z.enum(
    ['COMPUTER_ENGINEERING', 'INFORMATION_SYSTEMS', 'DIGITAL_BUSINESS'],
    {
      required_error: 'Please select a study program',
    },
  ),
  semester: z.string().min(1).max(20),
  contact: z.string().min(9).max(20),
  willingToBeContacted: z.boolean(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
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
})

export const blogSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long.' })
    .max(255, { message: 'Title cannot be longer than 255 characters.' })
    .trim(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long.' })
    .max(500, {
      message: 'Description cannot be longer than 500 characters.',
    })
    .trim(),
  content: z
    .string()
    .min(50, { message: 'Content must be at least 50 characters long.' })
    .trim()
    .regex(/[^\s]/, {
      message: 'Content cannot be empty or just whitespace.',
    }),
  category: z.enum(['BLOG', 'NEWS', 'PRESS_RELEASE']),
  thumbnail: z.any().optional(),
  authorId: z.string().optional(),
})

export type ReportSchema = z.infer<typeof reportSchema>
export type BlogSchema = z.infer<typeof blogSchema>
