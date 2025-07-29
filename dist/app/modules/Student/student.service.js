"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = void 0;
const AppError_1 = require("../../error/AppError");
const prisma_1 = require("../../lib/prisma");
const createStudentService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user exists
    const existingUser = yield prisma_1.prisma.user.findUnique({
        where: { id: payload.userId },
    });
    if (!existingUser) {
        throw new AppError_1.AppError(404, "User not found");
    }
    const result = yield prisma_1.prisma.$transaction([
        prisma_1.prisma.user.update({
            where: { id: payload.userId },
            data: { role: "STUDENT" },
        }),
        prisma_1.prisma.student.create({
            data: {
                userId: payload.userId,
                passportPhoto: payload.passportPhoto,
                sessionId: payload.sessionId,
                fullName: payload.fullName,
                fatherName: payload.fatherName,
                motherName: payload.motherName,
                departmentId: payload.departmentId
            },
            include: {
                user: true,
            },
        }),
    ]);
    return result[1];
});
const getAllStudentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.student.findMany({
        include: {
            user: true,
            statusHistory: {
                orderBy: { changedAt: "desc" },
                take: 1,
            },
        },
    });
});
const getStudentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prisma_1.prisma.student.findUnique({
        where: { id },
        include: {
            user: true,
            statusHistory: {
                orderBy: { changedAt: "desc" },
            },
        },
    });
    if (!student) {
        throw new AppError_1.AppError(404, "Student not found");
    }
    return student;
});
const updateStudentService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingStudent = yield prisma_1.prisma.student.findUnique({
        where: { id },
    });
    if (!existingStudent) {
        throw new AppError_1.AppError(404, "Student not found");
    }
    return prisma_1.prisma.student.update({
        where: { id },
        data: payload,
        include: {
            user: true,
        },
    });
});
const updateStudentStatusService = (id, status, reason, changedBy) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prisma_1.prisma.student.findUnique({
        where: { id },
    });
    if (!student) {
        throw new AppError_1.AppError(404, "Student not found");
    }
    const result = yield prisma_1.prisma.$transaction([
        prisma_1.prisma.student.update({
            where: { id },
            data: { status: status },
        }),
        prisma_1.prisma.studentStatusHistory.create({
            data: {
                studentId: id,
                fromStatus: student.status,
                toStatus: status,
                reason,
                changedBy,
            },
        }),
    ]);
    return result[0];
});
const deleteStudentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingStudent = yield prisma_1.prisma.student.findUnique({
        where: { id },
    });
    if (!existingStudent) {
        throw new AppError_1.AppError(404, "Student not found");
    }
    return prisma_1.prisma.student.delete({
        where: { id },
    });
});
exports.studentService = {
    createStudentService,
    getAllStudentsService,
    getStudentByIdService,
    updateStudentService,
    updateStudentStatusService,
    deleteStudentService,
};
