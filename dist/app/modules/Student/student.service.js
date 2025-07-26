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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = void 0;
const AppError_1 = require("../../error/AppError");
const prisma_1 = require("../../lib/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// =================================================================create student aand signup====================================================
const createStudent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, fatherName, fullName, motherName, gender, sessionId, departmentId, dateOfBirth, phone, passportPhoto, password, email, } = data;
    return yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. Check if session exists
        const session = yield tx.academicSession.findUnique({
            where: { id: sessionId },
        });
        if (!session)
            throw new AppError_1.AppError("Session not found", 404);
        // 2. Check if student with same fullName, fatherName, and motherName already exists
        const existingStudent = yield tx.student.findFirst({
            where: {
                fullName,
                fatherName,
                motherName,
            },
        });
        if (existingStudent)
            throw new AppError_1.AppError("Student already exists", 409);
        // 3. Check if email already exists
        const existingUser = yield tx.user.findUnique({
            where: { email },
        });
        if (existingUser)
            throw new AppError_1.AppError("Email already exists", 409);
        // 4. Generate Student ID
        const shortRandomId = Math.random().toString(36).substring(2, 8).toUpperCase(); // ABC123
        const generateStudentId = `${session.name}-${shortRandomId}`; // 2025-ABC123
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        // 5. Create student
        const student = yield tx.student.create({
            data: {
                generateStudentId,
                fullName,
                fatherName,
                motherName,
                address,
                gender,
                sessionId,
                departmentId,
                dateOfBirth,
                phone,
                passportPhoto,
            },
        });
        // 6. Create user
        const user = yield tx.user.create({
            data: {
                email,
                password: hashPassword,
                fullName,
                pasportPhoto: passportPhoto,
                generateStudentId,
                studentId: student.id,
                role: "STUDENT",
            },
        });
        return { student, user };
    }));
});
// ==========================================================get student byId=============================================
const getStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prisma_1.prisma.student.findUnique({
        where: { id },
        include: {
            department: {
                include: {
                    faculty: true
                }
            }
        }
    });
    if (!student)
        throw new AppError_1.AppError("Student not found", 404);
    return student;
});
// =============================================get StudentBy userID=============================================
const getStudentsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userWithStudent = yield prisma_1.prisma.student.findUnique({
        where: { id: userId },
    });
    if (!userWithStudent) {
        throw new AppError_1.AppError("Student not found");
    }
    return userWithStudent;
});
// ===========================================Get All students============================================
const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.student.findMany({
        include: {
            department: {
                include: {
                    faculty: true
                }
            }
        }
    });
});
// ============================================update Students===============================================
const updateStudentById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prisma_1.prisma.student.findUnique({ where: { id } });
    if (!student)
        throw new AppError_1.AppError("Student not found", 404);
    return prisma_1.prisma.student.update({
        where: { id },
        data,
    });
});
// ===============export StydentService==========================
exports.studentService = {
    createStudent,
    getStudentById,
    getAllStudents,
    updateStudentById,
    getStudentsByUserId,
};
