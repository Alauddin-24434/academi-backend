import { z } from "zod";

export const createFacultySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const updateFacultySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});
