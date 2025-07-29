import { z } from "zod"

export const createStaffZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().optional(),
    position: z.string().min(1, "Position is required"),
    title: z.string().optional(),
    department: z.string().optional(),
    qualification: z.string().optional(),
    experience: z.number().min(0).optional(),
    specialization: z.string().optional(),
    bio: z.string().optional(),
    userId: z.string().min(1, "userId is required"),
    joinedDate: z.string().datetime().optional(),
  }),
})

export const updateStaffZodSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    phone: z.string().optional(),
    position: z.string().min(1).optional(),
    title: z.string().optional(),
    department: z.string().optional(),
    qualification: z.string().optional(),
    experience: z.number().min(0).optional(),
    specialization: z.string().optional(),
    bio: z.string().optional(),
    achievements: z.any().optional(),
    awards: z.number().min(0).optional(),
    officeLocation: z.string().optional(),
    officeHours: z.string().optional(),
    linkedinUrl: z.string().url().optional(),
    researchUrl: z.string().url().optional(),
    profileImage: z.string().optional(),
    coverImage: z.string().optional(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    displayOrder: z.number().optional(),
  }),
})
