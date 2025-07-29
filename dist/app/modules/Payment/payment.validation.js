"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentTypeZodSchema = exports.createPaymentTypeZodSchema = exports.updatePaymentZodSchema = exports.createPaymentZodSchema = void 0;
const zod_1 = require("zod");
exports.createPaymentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, "Student ID is required"),
        paymentTypeId: zod_1.z.string().min(1, "Payment type ID is required"),
        amount: zod_1.z.number().min(0, "Amount must be positive"),
        paymentMethod: zod_1.z.enum(["CASH", "BANK_TRANSFER", "MOBILE_BANKING", "CARD", "ONLINE"]).optional(),
    }),
});
exports.updatePaymentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number().min(0).optional(),
        status: zod_1.z.enum(["PENDING", "COMPLETE", "FAILED", "CANCELED", "REFUNDED"]).optional(),
        paymentDate: zod_1.z.string().datetime().optional(),
        dueDate: zod_1.z.string().datetime().optional(),
        transactionId: zod_1.z.string().optional(),
        paymentMethod: zod_1.z.enum(["CASH", "BANK_TRANSFER", "MOBILE_BANKING", "CARD", "ONLINE"]).optional(),
        reference: zod_1.z.string().optional(),
        notes: zod_1.z.string().optional(),
    }),
});
exports.createPaymentTypeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string("Payment type name is required"),
        description: zod_1.z.string().optional(),
        amount: zod_1.z.number().min(0, "Amount must be positive"),
        isActive: zod_1.z.boolean().optional(),
        isOneTime: zod_1.z.boolean().optional(),
        features: zod_1.z.any().optional(), // or z.array(z.string()) if you know it's an array of strings
        label: zod_1.z.string().optional(),
    }),
});
exports.updatePaymentTypeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        description: zod_1.z.string().optional(),
        amount: zod_1.z.number().min(0).optional(),
        isActive: zod_1.z.boolean().optional(),
        isOneTime: zod_1.z.boolean().optional(),
        features: zod_1.z.any().optional(),
        label: zod_1.z.string().optional(),
    }),
});
