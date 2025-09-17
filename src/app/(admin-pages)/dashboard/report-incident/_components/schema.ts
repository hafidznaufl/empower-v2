import { z } from 'zod'

export const genderEnum = z.enum(['MALE', 'FEMALE'])
export const studyProgramEnum = z.enum([
  'INFORMATION_SYSTEMS',
  'INFORMATICS_ENGINEERING',
  'DIGITAL_BUSINESS',
])

export const reportStatusEnum = z.enum([
  'PENDING',
  'IN_PROCESS',
  'PROVEN_LIGHTLY_SANCTIONED',
  'PROVEN_MODERATElYY_SANCTIONED',
  'PROVEN_SEVERELY_SANCTIONED',
  'SOLVED',
  'NOT_PROVEN',
  'NOT_SANCTIONED',
])

export const reportIncidentSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z.string().email('Invalid email'),
  dayOfBirth: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  gender: genderEnum,
  studyProgram: studyProgramEnum,
  semester: z
    .string()
    .min(1, 'Semester must not be empty')
    .max(20, 'Semester too long'),
  contact: z
    .string()
    .min(5, 'Contact must be at least 5 characters')
    .max(20, 'Contact too long'),
  willingToBeContacted: z.boolean(),
  incidentDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters'),
  fileURL: z.array(z.string().url('Each file URL must be a valid URL')),
  reportStatus: reportStatusEnum.default('PENDING'),
  createdAt: z
    .union([z.date(), z.string()])
    .transform((val) => new Date(val))
    .optional(),
})

export const reportIncidentSchemaColumn = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  dayOfBirth: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  gender: genderEnum,
  studyProgram: studyProgramEnum,
  semester: z.string(),
  contact: z.string(),
  willingToBeContacted: z.boolean(),
  incidentDescription: z.string(),
  fileURL: z.array(z.string()),
  reportStatus: reportStatusEnum,
  createdAt: z.union([z.date(), z.string()]).transform((val) => new Date(val)),
})

export type ReportIncident = z.infer<typeof reportIncidentSchema>
export type ReportIncidentColumn = z.infer<typeof reportIncidentSchemaColumn>
