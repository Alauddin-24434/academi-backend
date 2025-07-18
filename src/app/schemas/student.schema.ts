
import { z } from "zod";

export const createStudentSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  fullName: z.string().min(3, "Full name is required"),
  fatherName: z.string().min(3, "Father's name is required"),
  motherName: z.string().min(3, "Mother's name is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().optional(),
  grade: z.string().min(1, "Grade is required"),
  degree: z.string().optional(),
  session: z.string().optional(),
  documentUrl: z.string().url("Invalid document URL").optional(), // Optional in model
  dateJoined: z.coerce.date().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "GRADUATED", "SUSPENDED", "PENDING"]).default("PENDING"),
});


export const updateStudentSchema = createStudentSchema.partial()

export const studentQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  grade: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "GRADUATED", "SUSPENDED"]).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
})

export type CreateStudentInput = z.infer<typeof createStudentSchema>
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
export type StudentQueryInput = z.infer<typeof studentQuerySchema>
