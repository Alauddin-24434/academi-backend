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
exports.userService = exports.loginUserByEmail = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../error/AppError");
// 1. Create User
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.prisma.user.findUnique({
        where: { email: data.email },
    });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    const hashPassword = yield bcryptjs_1.default.hash(data.password, 10);
    const payload = Object.assign(Object.assign({}, data), { password: hashPassword });
    return yield prisma_1.prisma.user.create({
        data: payload,
        select: {
            id: true,
            password: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
});
const loginUserByEmail = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const user = yield prisma_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    // যদি user না মিলে
    if (!user) {
        throw new AppError_1.AppError("Invalid email or password", 400);
        // অথবা: throw new Error("Invalid email or password");
    }
    // পাসওয়ার্ড মিল আছে কি না চেক
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.AppError("Invalid email or password", 400);
        // অথবা: throw new Error("Invalid email or password");
    }
    // পাসওয়ার্ড ও ইউজার ঠিক থাকলে রিটার্ন
    return user;
});
exports.loginUserByEmail = loginUserByEmail;
// 2. Get All Users
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number.parseInt(query.page || "1");
    const limit = Number.parseInt(query.limit || "10");
    const skip = (page - 1) * limit;
    const where = query.search
        ? {
            OR: [
                { name: { contains: query.search, mode: "insensitive" } },
                { email: { contains: query.search, mode: "insensitive" } },
            ],
        }
        : {};
    const [users, total] = yield Promise.all([
        prisma_1.prisma.user.findMany({
            where,
            skip,
            include: { student: true },
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.user.count({ where }),
    ]);
    return {
        data: users,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1,
        },
    };
});
// 3. Get User By ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({
        where: { id },
        include: { student: { include: { department: { include: { faculty: true } } } } }
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
});
// 4. Update User
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new Error("User not found");
    }
    return yield prisma_1.prisma.user.update({
        where: { id },
        data,
        select: {
            id: true,
            email: true,
            role: true,
            updatedAt: true,
        },
    });
});
// 5. Delete User
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new Error("User not found");
    }
    yield prisma_1.prisma.user.delete({ where: { id } });
    return { message: "User deleted successfully" };
});
// ✅ Final Export Object
exports.userService = {
    createUser,
    loginUserByEmail: exports.loginUserByEmail,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
