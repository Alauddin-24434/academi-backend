import { z } from "zod";

export const createAcademicSessionSchema = z.object({
  name: z.string().min(4, "Session name is required"),  // e.g. "2020-21"
});

export type CreateAcademicSessionInput = z.infer<typeof createAcademicSessionSchema>;
