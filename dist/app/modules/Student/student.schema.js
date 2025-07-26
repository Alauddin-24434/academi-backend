"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentSchema = exports.createStudentSchema = exports.studentStatusEnum = exports.genderEnum = void 0;
const zod_1 = require("zod");
exports.genderEnum = zod_1.z.enum(["MALE", "FEMALE", "OTHER"]);
exports.studentStatusEnum = zod_1.z.enum(["PENDING", "APPROVE", "REJECT"]);
exports.createStudentSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full name is required"),
    fatherName: zod_1.z.string().min(1, "Father's name is required"),
    password: zod_1.z.string().min(6, "Password should be at least 6 characters"),
    motherName: zod_1.z.string().min(1, "Mother's name is required"),
    phone: zod_1.z
        .string().min(11, "Invalid Bangladeshi phone number"),
    email: zod_1.z.string().email("Invalid email address"),
    address: zod_1.z.string().min(1, "Address is required"),
    passportPhoto: zod_1.z.string().optional(),
    gender: exports.genderEnum,
    dateOfBirth: zod_1.z.string().min(1, "Date of birth is required"),
    status: exports.studentStatusEnum.optional(),
    sessionId: zod_1.z.string().min(1, "Session ID is required"),
    departmentId: zod_1.z.string().min(1, "Department ID is required"),
});
exports.updateStudentSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full name is required"),
    fatherName: zod_1.z.string().min(1, "Father's name is required"),
    motherName: zod_1.z.string().min(1, "Mother's name is required"),
    phone: zod_1.z
        .string().min(11, "Invalid Bangladeshi phone number"),
    address: zod_1.z.string().min(1, "Address is required"),
    passportPhoto: zod_1.z.string().optional(),
    gender: exports.genderEnum,
    dateOfBirth: zod_1.z.string().min(1, "Date of birth is required"),
    status: exports.studentStatusEnum.optional(), // default from Prisma is PENDING
    sessionId: zod_1.z.string().min(1, "Session ID is required"),
    departmentId: zod_1.z.string().min(1, "Department ID is required"),
});
