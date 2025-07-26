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
exports.departmentService = void 0;
const AppError_1 = require("../../error/AppError");
const prisma_1 = require("../../lib/prisma");
const createDepartment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.prisma.department.findUnique({ where: { code: data.code } });
    if (exists)
        throw new AppError_1.AppError("Department code already exists", 400);
    return prisma_1.prisma.department.create({ data });
});
const getDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield prisma_1.prisma.department.findUnique({ where: { id }, include: { faculty: true, students: true, } });
    if (!department)
        throw new AppError_1.AppError("Department not found", 404);
    return department;
});
const getAllDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.department.findMany({ include: { faculty: true, students: true, } });
});
const updateDepartmentById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield prisma_1.prisma.department.findUnique({ where: { id } });
    if (!department)
        throw new AppError_1.AppError("Department not found", 404);
    return prisma_1.prisma.department.update({ where: { id }, data });
});
const deleteDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield prisma_1.prisma.department.findUnique({ where: { id } });
    if (!department)
        throw new AppError_1.AppError("Department not found", 404);
    return prisma_1.prisma.department.delete({ where: { id } });
});
exports.departmentService = {
    createDepartment,
    getDepartmentById,
    getAllDepartments,
    updateDepartmentById,
    deleteDepartmentById,
};
