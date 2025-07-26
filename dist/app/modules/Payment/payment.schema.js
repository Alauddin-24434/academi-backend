"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentSchema = void 0;
const zod_1 = require("zod");
exports.createPaymentSchema = zod_1.z.object({
    amount: zod_1.z.number().positive("Amount must be a positive number"),
    paymentDate: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid payment date",
    })
        .transform((val) => new Date(val)), // ✅ Convert to Date
    description: zod_1.z.string().optional(),
    studentId: zod_1.z.string().optional(),
});
