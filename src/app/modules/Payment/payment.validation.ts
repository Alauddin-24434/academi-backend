import { z } from "zod"

export const createPaymentZodSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "Student ID is required"),
    paymentTypeId: z.string().min(1, "Payment type ID is required"),
    amount: z.number().min(0, "Amount must be positive"),
    paymentMethod: z.enum(["CASH", "BANK_TRANSFER", "MOBILE_BANKING", "CARD", "ONLINE"]).optional(),
 
  }),
})

export const updatePaymentZodSchema = z.object({
  body: z.object({
    amount: z.number().min(0).optional(),
    status: z.enum(["PENDING", "COMPLETE", "FAILED", "CANCELED", "REFUNDED"]).optional(),
    paymentDate: z.string().datetime().optional(),
    dueDate: z.string().datetime().optional(),
    transactionId: z.string().optional(),
    paymentMethod: z.enum(["CASH", "BANK_TRANSFER", "MOBILE_BANKING", "CARD", "ONLINE"]).optional(),
    reference: z.string().optional(),
    notes: z.string().optional(),
  }),
})


export const createPaymentTypeZodSchema = z.object({
  body: z.object({
    name: z.string("Payment type name is required"),
    description: z.string().optional(),
    amount: z.number().min(0, "Amount must be positive"),
    isActive: z.boolean().optional(),
    isOneTime: z.boolean().optional(),
    features: z.any().optional(), // or z.array(z.string()) if you know it's an array of strings
    label: z.string().optional(),
  }),
});
export const updatePaymentTypeZodSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    amount: z.number().min(0).optional(),
    isActive: z.boolean().optional(),
    isOneTime: z.boolean().optional(),
    features: z.any().optional(),
    label: z.string().optional(),
  }),
});
