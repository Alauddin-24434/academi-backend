"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDepartmentZodSchema = void 0;
// validations/department.validation.ts
const zod_1 = require("zod");
exports.createDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string("Department name is required")
            .min(2, "Name must be at least 2 characters long"),
        code: zod_1.z
            .string("Department code is required")
            .min(2, "Code must be at least 2 characters"),
        description: zod_1.z.string().optional().nullable(),
        facultyId: zod_1.z
            .string("Faculty ID is required"),
    }),
});
