// validations/department.validation.ts
import { z } from "zod";

export const createDepartmentZodSchema = z.object({
  body: z.object({
    name: z
      .string( "Department name is required",
      )
      .min(2, "Name must be at least 2 characters long"),

    code: z
      .string( "Department code is required",
      )
      .min(2, "Code must be at least 2 characters"),

    description: z.string().optional().nullable(),

    facultyId: z
      .string("Faculty ID is required",
      ),
  }),
});
