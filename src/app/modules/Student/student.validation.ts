import { z } from "zod"


export const createStudentZodSchema = z.object({
  body: z.object({
    userId: z.string(),
    sessionId: z.string(),
    fullName: z.string(),
    fatherName: z.string(),
    motherName: z.string(),
    departmentId: z.string(),
    address: z.string(),
    passportPhoto: z.string().optional()
  }),
});


export const updateStudentZodSchema = z.object({
  body: z.object({
    program: z.string().optional(),
    batch: z.string().optional(),
    section: z.string().optional(),
    cgpa: z.number().min(0).max(4).optional(),
    totalCredits: z.number().min(0).optional(),
    emergencyContact: z.string().optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    address: z.string().optional(),
    bloodGroup: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
})

export const updateStudentStatusZodSchema = z.object({
  body: z.object({
    status: z.enum(["PENDING", "APPROVED", "SUSPENDED", "GRADUATED", "DROPPED", "TRANSFERRED"]),
    reason: z.string().optional(),
  }),
})
