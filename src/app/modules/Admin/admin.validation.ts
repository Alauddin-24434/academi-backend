import { z } from "zod"


export const createAdminZodSchema = z.object({
  body: z.object({
    userId: z.string( "userId is required"),
    permissions: z
      .any()
      .optional(), // You can refine this if you want specific permission keys
  }),
});


export const updateAdminValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    permissions: z.any().optional(),
    isActive: z.boolean().optional(),
  }),
})
