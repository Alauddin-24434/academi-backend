// validations/faculty.validation.ts
import { z } from "zod";

export const createFacultyZodSchema = z.object({
  body: z.object({
    name: z
      .string(
        "Faculty name is required",
      )
      .min(2, "Name must be at least 2 characters long"),

    code: z
      .string("Faculty code is required",
      )
      .min(2, "Code must be at least 2 characters"),

    description: z
      .string()
      .optional()
      .nullable(),
  }),
});
