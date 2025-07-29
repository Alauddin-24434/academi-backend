import { z } from "zod";

export const createAcademicSessionZodSchema = z.object({
  body: z.object({
    name: z.string().min(4),
    
  }),
});

export const updateAcademicSessionZodSchema = z.object({
  body: z.object({
    name: z.string().min(4).optional(),
  
    isActive: z.boolean().optional(),
  }),
});
