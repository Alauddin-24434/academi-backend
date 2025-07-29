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
exports.getDashboardOverview = getDashboardOverview;
const prisma_1 = require("../../lib/prisma");
function generateAdmissionTrend(admissions) {
    const sorted = [...admissions].sort((a, b) => a.session.localeCompare(b.session));
    return sorted.map((current, index) => {
        if (index === 0) {
            return Object.assign(Object.assign({}, current), { differenceFromPrevious: null, status: "neutral" });
        }
        const prev = sorted[index - 1];
        const diff = current.studentCount - prev.studentCount;
        return Object.assign(Object.assign({}, current), { differenceFromPrevious: diff, status: diff === 0 ? "neutral" : diff > 0 ? "up" : "down" });
    });
}
function getDashboardOverview(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = user.role;
        if (role === "SUPER_ADMIN") {
            const totalStudents = yield prisma_1.prisma.student.count();
            const totalStaff = yield prisma_1.prisma.staff.count();
            const totalAdmins = yield prisma_1.prisma.user.count({ where: { role: "ADMIN" } });
            // Aggregate sum of payments amount
            const totalPaymentsAgg = yield prisma_1.prisma.payment.aggregate({
                _sum: { amount: true },
            });
            // Convert Prisma Decimal to number safely
            const totalPaymentsDecimal = totalPaymentsAgg._sum.amount;
            const totalPayments = totalPaymentsDecimal ? totalPaymentsDecimal.toNumber() : 0;
            // Session wise student count grouped by sessionId
            const sessionWiseRaw = yield prisma_1.prisma.student.groupBy({
                by: ["sessionId"],
                _count: { _all: true },
            });
            // Fetch sessions names for mapping sessionId -> session name
            const sessionIds = sessionWiseRaw.map((s) => s.sessionId);
            const sessions = yield prisma_1.prisma.academicSession.findMany({
                where: { id: { in: sessionIds } },
                select: { id: true, name: true },
            });
            const sessionMap = new Map(sessions.map((s) => [s.id, s.name]));
            const sessionWiseAdmissions = sessionWiseRaw.map((item) => {
                var _a;
                return ({
                    session: (_a = sessionMap.get(item.sessionId)) !== null && _a !== void 0 ? _a : "Unknown",
                    studentCount: item._count._all,
                });
            });
            // Admission trend calculation
            const admissionTrend = generateAdmissionTrend(sessionWiseAdmissions);
            // Department wise student count grouped by departmentId
            const departmentWiseRaw = yield prisma_1.prisma.student.groupBy({
                by: ["departmentId"],
                _count: { _all: true },
            });
            const departmentIds = departmentWiseRaw.map((d) => d.departmentId);
            const departments = yield prisma_1.prisma.department.findMany({
                where: { id: { in: departmentIds } },
                select: { id: true, name: true },
            });
            const departmentMap = new Map(departments.map((d) => [d.id, d.name]));
            const departmentWise = departmentWiseRaw.map((item) => {
                var _a;
                return ({
                    department: (_a = departmentMap.get(item.departmentId)) !== null && _a !== void 0 ? _a : "Unknown",
                    studentCount: item._count._all,
                });
            });
            // Faculty wise student count grouped by facultyId
            const facultyWiseRaw = yield prisma_1.prisma.student.groupBy({
                by: ["facultyId"],
                _count: { _all: true },
            });
            // Filter out nulls for facultyId before fetching
            const facultyIds = facultyWiseRaw
                .map((f) => f.facultyId)
                .filter((id) => id !== null);
            const faculties = yield prisma_1.prisma.faculty.findMany({
                where: { id: { in: facultyIds } },
                select: { id: true, name: true },
            });
            const facultyMap = new Map(faculties.map((f) => [f.id, f.name]));
            const facultyWise = facultyWiseRaw
                .filter((item) => item.facultyId !== null)
                .map((item) => {
                var _a;
                return ({
                    faculty: (_a = facultyMap.get(item.facultyId)) !== null && _a !== void 0 ? _a : "Unknown",
                    studentCount: item._count._all,
                });
            });
            const stats = {
                totalStudents,
                totalStaff,
                totalAdmins,
                totalPayments,
            };
            return {
                role,
                stats,
                sessionWiseAdmissions,
                admissionTrend,
                departmentWise,
                facultyWise,
            };
        }
        if (role === "ADMIN") {
            // TODO: Implement admin-specific overview logic as needed
            return {
                role,
                stats: {
                    myDepartmentStudents: 125,
                    myFacultyStudents: 350,
                    totalStudents: 0,
                    totalStaff: 0,
                    totalAdmins: 0,
                    totalPayments: 0,
                },
                message: "Admin overview data",
            };
        }
        if (role === "STUDENT") {
            return {
                role,
                profile: {
                    studentId: user.id,
                    name: "Student Name",
                    session: "2023-24",
                    department: "CSE",
                    status: "APPROVED",
                },
                message: "Student dashboard data",
            };
        }
        if (role === "GUEST") {
            return {
                role,
                message: "Guest access limited. Please register or login.",
            };
        }
        return {
            role,
            message: "No data available for your role.",
        };
    });
}
