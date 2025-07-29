"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStaffZodSchema = exports.createStaffZodSchema = void 0;
const zod_1 = require("zod");
exports.createStaffZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        phone: zod_1.z.string().optional(),
        position: zod_1.z.string().min(1, "Position is required"),
        title: zod_1.z.string().optional(),
        department: zod_1.z.string().optional(),
        qualification: zod_1.z.string().optional(),
        experience: zod_1.z.number().min(0).optional(),
        specialization: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        userId: zod_1.z.string().min(1, "userId is required"),
        joinedDate: zod_1.z.string().datetime().optional(),
    }),
});
exports.updateStaffZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        phone: zod_1.z.string().optional(),
        position: zod_1.z.string().min(1).optional(),
        title: zod_1.z.string().optional(),
        department: zod_1.z.string().optional(),
        qualification: zod_1.z.string().optional(),
        experience: zod_1.z.number().min(0).optional(),
        specialization: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        achievements: zod_1.z.any().optional(),
        awards: zod_1.z.number().min(0).optional(),
        officeLocation: zod_1.z.string().optional(),
        officeHours: zod_1.z.string().optional(),
        linkedinUrl: zod_1.z.string().url().optional(),
        researchUrl: zod_1.z.string().url().optional(),
        profileImage: zod_1.z.string().optional(),
        coverImage: zod_1.z.string().optional(),
        isActive: zod_1.z.boolean().optional(),
        isFeatured: zod_1.z.boolean().optional(),
        displayOrder: zod_1.z.number().optional(),
    }),
});
