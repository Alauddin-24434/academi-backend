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
exports.facultyService = void 0;
const AppError_1 = require("../../error/AppError");
const prisma_1 = require("../../lib/prisma");
const createFaculty = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.prisma.faculty.findUnique({ where: { name: data.name, code: data.code } });
    if (exists)
        throw new AppError_1.AppError(400, "Faculty already exists");
    return prisma_1.prisma.faculty.create({ data });
});
const getFacultyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield prisma_1.prisma.faculty.findUnique({ where: { id }, include: { departments: true } });
    if (!faculty)
        throw new AppError_1.AppError(404, "Faculty not found");
    return faculty;
});
const getAllFaculties = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.faculty.findMany({ include: { departments: true } });
});
const updateFacultyById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield prisma_1.prisma.faculty.findUnique({ where: { id } });
    if (!faculty)
        throw new AppError_1.AppError(404, "Faculty not found");
    return prisma_1.prisma.faculty.update({ where: { id }, data });
});
const deleteFacultyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield prisma_1.prisma.faculty.findUnique({ where: { id } });
    if (!faculty)
        throw new AppError_1.AppError(404, "Faculty not found");
    return prisma_1.prisma.faculty.delete({ where: { id } });
});
exports.facultyService = {
    createFaculty,
    getFacultyById,
    getAllFaculties,
    updateFacultyById,
    deleteFacultyById,
};
