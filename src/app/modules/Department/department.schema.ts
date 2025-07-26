import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  facultyId: z.string().min(1),
});

export const updateDepartmentSchema = z.object({
  name: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  facultyId: z.string().min(1).optional(),
});
