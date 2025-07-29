"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminValidationSchema = exports.createAdminZodSchema = void 0;
const zod_1 = require("zod");
exports.createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string("userId is required"),
        permissions: zod_1.z
            .any()
            .optional(), // You can refine this if you want specific permission keys
    }),
});
exports.updateAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        phone: zod_1.z.string().optional(),
        permissions: zod_1.z.any().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
