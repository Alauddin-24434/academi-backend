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
exports.getDashboardOverview = void 0;
const AppError_1 = require("../../error/AppError");
const prisma_1 = require("../../lib/prisma");
const getDashboardOverview = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (user.role === "ADMIN") {
        // Admin: System-wide stats
        const totalStudents = yield prisma_1.prisma.student.count();
        const approvedStudents = yield prisma_1.prisma.student.count({
            where: { status: "APPROVE" },
        });
        const pendingStudents = yield prisma_1.prisma.student.count({
            where: { status: "PENDING" },
        });
        const suspendedStudents = yield prisma_1.prisma.student.count({
            where: { status: "SUSPENDED" },
        });
        const totalFaculties = yield prisma_1.prisma.faculty.count();
        const totalDepartments = yield prisma_1.prisma.department.count();
        const totalPaymentsAmount = yield prisma_1.prisma.payment.aggregate({
            _sum: { amount: true },
        });
        const completedPayments = yield prisma_1.prisma.payment.aggregate({
            _sum: { amount: true },
            where: { status: "COMPLETE" },
        });
        const pendingPayments = yield prisma_1.prisma.payment.aggregate({
            _sum: { amount: true },
            where: { status: "PENDING" },
        });
        return {
            role: "ADMIN",
            totalStudents,
            approvedStudents,
            pendingStudents,
            suspendedStudents,
            totalFaculties,
            totalDepartments,
            totalPayments: totalPaymentsAmount._sum.amount || 0,
            completedPayments: completedPayments._sum.amount || 0,
            pendingPayments: pendingPayments._sum.amount || 0,
        };
    }
    // Student: Personal dashboard
    if (user.role === "STUDENT") {
        const isExistUser = yield prisma_1.prisma.user.findUnique({
            where: { id: user.id },
            include: {
                student: {
                    include: {
                        session: true,
                        department: { include: { faculty: true } },
                        payments: true,
                    },
                },
            },
        });
        if (!(isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.student)) {
            throw new AppError_1.AppError("Student not found", 404);
        }
        const completed = (_b = (_a = isExistUser.student.payments) === null || _a === void 0 ? void 0 : _a.filter((p) => p.status === "COMPLETE")) !== null && _b !== void 0 ? _b : [];
        return {
            role: "STUDENT",
            fullName: isExistUser.student.fullName,
            status: isExistUser.student.status,
            session: isExistUser.student.session.name,
            department: isExistUser.student.department.name,
            faculty: isExistUser.student.department.faculty.name,
            totalPaid: completed.reduce((sum, p) => sum + p.amount, 0),
            paymentLists: (_d = (_c = isExistUser.student.payments) === null || _c === void 0 ? void 0 : _c.filter((p) => p.status === "COMPLETE" ||
                p.status === "CANCELED" ||
                p.status === "FAILED")) !== null && _d !== void 0 ? _d : [],
        };
    }
    throw new AppError_1.AppError("Unauthorized role", 403);
});
exports.getDashboardOverview = getDashboardOverview;
