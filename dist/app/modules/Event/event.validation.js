"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventZodSchema = exports.createEventZodSchema = void 0;
const zod_1 = require("zod");
exports.createEventZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Event name is required"),
        description: zod_1.z.string().optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        startTime: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional(),
        location: zod_1.z.string().min(1, "Location is required"),
        venue: zod_1.z.string().optional(),
        category: zod_1.z.string().min(1, "Category is required"),
        type: zod_1.z.enum(["PHYSICAL", "VIRTUAL", "HYBRID"]).default("PHYSICAL"),
        maxAttendees: zod_1.z.number().min(1).optional(),
        registrationRequired: zod_1.z.boolean().default(true),
        registrationDeadline: zod_1.z.string().optional(),
        registrationFee: zod_1.z.number().min(0).optional(),
        contactEmail: zod_1.z.string().email().optional(),
        contactPhone: zod_1.z.string().optional(),
        organizerName: zod_1.z.string().optional(),
    }),
});
exports.updateEventZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        description: zod_1.z.string().optional(),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        startTime: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        venue: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        type: zod_1.z.enum(["PHYSICAL", "VIRTUAL", "HYBRID"]).optional(),
        maxAttendees: zod_1.z.number().min(1).optional(),
        expectedAttendees: zod_1.z.number().min(1).optional(),
        registrationRequired: zod_1.z.boolean().optional(),
        registrationDeadline: zod_1.z.string().datetime().optional(),
        registrationFee: zod_1.z.number().min(0).optional(),
        status: zod_1.z.enum(["DRAFT", "UPCOMING", "ONGOING", "COMPLETED", "CANCELLED", "POSTPONED"]).optional(),
        featuredImage: zod_1.z.string().optional(),
        bannerImage: zod_1.z.string().optional(),
        isFeatured: zod_1.z.boolean().optional(),
        isPublished: zod_1.z.boolean().optional(),
        contactEmail: zod_1.z.string().email().optional(),
        contactPhone: zod_1.z.string().optional(),
        organizerName: zod_1.z.string().optional(),
    }),
});
