"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacultySchema = exports.createFacultySchema = void 0;
const zod_1 = require("zod");
exports.createFacultySchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
});
exports.updateFacultySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
});
