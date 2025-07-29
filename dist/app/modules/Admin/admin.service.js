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
exports.adminService = exports.createAdminService = void 0;
const AppError_1 = require("../../error/AppError");
const prisma_1 = require("../../lib/prisma");
const createAdminService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 0: Check if the user exists
    const existingUser = yield prisma_1.prisma.user.findUnique({
        where: { id: payload.userId },
    });
    if (!existingUser) {
        throw new AppError_1.AppError(404, "User not found");
    }
    const alreadyExist = yield prisma_1.prisma.admin.findFirst({
        where: { userId: payload.userId }
    });
    if (alreadyExist) {
        throw new AppError_1.AppError(400, "Admin is already Exist");
    }
    // Step 1 & 2: Update user role and create admin profile in a transaction
    const admin = yield prisma_1.prisma.$transaction([
        prisma_1.prisma.user.update({
            where: { id: payload.userId },
            data: { role: "ADMIN" },
        }),
        prisma_1.prisma.admin.create({
            data: {
                userId: payload.userId,
                permissions: payload.permissions,
            },
            include: {
                user: true,
            },
        }),
    ]);
    return admin;
});
exports.createAdminService = createAdminService;
const getAllAdminsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.admin.findMany({
        where: {
            user: {
                role: 'ADMIN',
            },
        },
        include: {
            user: true,
        },
    });
});
const getAdminByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.admin.findUnique({
        where: { id },
        include: { user: true },
    });
});
// ✅ Final Export Object
exports.adminService = {
    createAdminService: exports.createAdminService,
    getAdminByIdService,
    getAllAdminsService
};
