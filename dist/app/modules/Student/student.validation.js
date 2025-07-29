"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentStatusZodSchema = exports.updateStudentZodSchema = exports.createStudentZodSchema = void 0;
const zod_1 = require("zod");
exports.createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        sessionId: zod_1.z.string(),
        fullName: zod_1.z.string(),
        fatherName: zod_1.z.string(),
        motherName: zod_1.z.string(),
        departmentId: zod_1.z.string(),
        address: zod_1.z.string(),
        passportPhoto: zod_1.z.string().optional()
    }),
});
exports.updateStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        program: zod_1.z.string().optional(),
        batch: zod_1.z.string().optional(),
        section: zod_1.z.string().optional(),
        cgpa: zod_1.z.number().min(0).max(4).optional(),
        totalCredits: zod_1.z.number().min(0).optional(),
        emergencyContact: zod_1.z.string().optional(),
        guardianName: zod_1.z.string().optional(),
        guardianPhone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.string().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.updateStudentStatusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["PENDING", "APPROVED", "SUSPENDED", "GRADUATED", "DROPPED", "TRANSFERRED"]),
        reason: zod_1.z.string().optional(),
    }),
});
