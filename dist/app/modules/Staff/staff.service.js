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
exports.staffService = void 0;
const AppError_1 = require("../../error/AppError");
const prisma_1 = require("../../lib/prisma");
const createStaffService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.prisma.user.findUnique({
        where: { id: payload.userId },
    });
    if (!existingUser) {
        throw new AppError_1.AppError(404, "User not found");
    }
    const result = yield prisma_1.prisma.$transaction([
        prisma_1.prisma.user.update({
            where: { id: payload.userId },
            data: { role: "STAFF" },
        }),
        prisma_1.prisma.staff.create({
            data: Object.assign(Object.assign({}, payload), { joinedDate: payload.joinedDate ? new Date(payload.joinedDate) : new Date() }),
            include: {
                user: true,
                stats: true,
                socialLinks: true,
            },
        }),
    ]);
    return result[1];
});
const getAllStaffService = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.staff.findMany({
        include: {
            user: true,
            stats: {
                orderBy: { order: 'asc' },
            },
            socialLinks: {
                where: { isActive: true },
            },
        },
        orderBy: [
            { isFeatured: 'desc' },
            { displayOrder: 'asc' },
            { name: 'asc' },
        ],
    });
});
const getStaffByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const staff = yield prisma_1.prisma.staff.findUnique({
        where: { id },
        include: {
            user: true,
            stats: {
                orderBy: { order: 'asc' },
            },
            socialLinks: {
                where: { isActive: true },
            },
        },
    });
    if (!staff) {
        throw new AppError_1.AppError(404, "Staff member not found");
    }
    return staff;
});
const updateStaffService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingStaff = yield prisma_1.prisma.staff.findUnique({
        where: { id },
    });
    if (!existingStaff) {
        throw new AppError_1.AppError(404, "Staff member not found");
    }
    return prisma_1.prisma.staff.update({
        where: { id },
        data: payload,
        include: {
            user: true,
            stats: true,
            socialLinks: true,
        },
    });
});
const deleteStaffService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingStaff = yield prisma_1.prisma.staff.findUnique({
        where: { id },
    });
    if (!existingStaff) {
        throw new AppError_1.AppError(404, "Staff member not found");
    }
    return prisma_1.prisma.staff.delete({
        where: { id },
    });
});
exports.staffService = {
    createStaffService,
    getAllStaffService,
    getStaffByIdService,
    updateStaffService,
    deleteStaffService,
};
