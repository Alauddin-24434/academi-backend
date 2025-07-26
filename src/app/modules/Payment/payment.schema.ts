import { z } from "zod";

export const createPaymentSchema = z.object({
  amount: z.number().positive("Amount must be a positive number"),
  paymentDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid payment date",
    })
    .transform((val) => new Date(val)), // ✅ Convert to Date
  description: z.string().optional(),
  studentId: z.string().optional(),
});
