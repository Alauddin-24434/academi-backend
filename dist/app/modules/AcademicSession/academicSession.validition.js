"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicSessionZodSchema = exports.createAcademicSessionZodSchema = void 0;
const zod_1 = require("zod");
exports.createAcademicSessionZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(4),
    }),
});
exports.updateAcademicSessionZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(4).optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
