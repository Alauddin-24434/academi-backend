import { z } from "zod";

export const eventStatusEnum = z.enum(["PENDING", "ACTIVE", "COMPLETED"]);

export const createEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  date: z.string().datetime("Invalid date-time format"),
  images: z.array(z.string().url()).optional().default([]),
  status: eventStatusEnum.optional().default("PENDING"),
});

export const updateEventSchema = createEventSchema.partial();
