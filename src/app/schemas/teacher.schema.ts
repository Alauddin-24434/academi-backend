import { z } from "zod"

export const createTeacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  expertise: z.array(z.string()).default([]),
  address: z.string().optional(),
  city: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "ON_LEAVE"]).default("ACTIVE"),
})

export const updateTeacherSchema = createTeacherSchema.partial()

export const createEducationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  startYear: z.string().min(4, "Start year is required"),
  endYear: z.string().min(4, "End year is required"),
})

export type CreateTeacherInput = z.infer<typeof createTeacherSchema>
export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>
export type CreateEducationInput = z.infer<typeof createEducationSchema>
