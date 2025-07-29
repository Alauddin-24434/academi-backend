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
exports.academicSessionService = exports.deleteAcademicSession = exports.updateAcademicSession = exports.getSingleAcademicSession = exports.getAllAcademicSessions = exports.createAcademicSession = void 0;
const AppError_1 = require("../../error/AppError");
const prisma_1 = require("../../lib/prisma");
const createAcademicSession = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.prisma.academicSession.findUnique({ where: { name: payload.name } });
    if (exists)
        throw new AppError_1.AppError(400, "Session code already exists");
    return yield prisma_1.prisma.academicSession.create({ data: payload });
});
exports.createAcademicSession = createAcademicSession;
const getAllAcademicSessions = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.academicSession.findMany();
});
exports.getAllAcademicSessions = getAllAcademicSessions;
const getSingleAcademicSession = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.academicSession.findUnique({ where: { id } });
    if (!result) {
        throw new AppError_1.AppError(404, "Academic session not found");
    }
    return result;
});
exports.getSingleAcademicSession = getSingleAcademicSession;
const updateAcademicSession = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.prisma.academicSession.findUnique({ where: { id } });
    if (!isExist) {
        throw new AppError_1.AppError(404, "Academic session not found");
    }
    return yield prisma_1.prisma.academicSession.update({
        where: { id },
        data: payload,
    });
});
exports.updateAcademicSession = updateAcademicSession;
const deleteAcademicSession = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.prisma.academicSession.findUnique({ where: { id } });
    if (!isExist) {
        throw new AppError_1.AppError(404, "Academic session not found");
    }
    return yield prisma_1.prisma.academicSession.update({
        where: { id },
        data: { isActive: false },
    });
});
exports.deleteAcademicSession = deleteAcademicSession;
exports.academicSessionService = {
    createAcademicSession: exports.createAcademicSession,
    getAllAcademicSessions: exports.getAllAcademicSessions,
    getSingleAcademicSession: exports.getSingleAcademicSession,
    updateAcademicSession: exports.updateAcademicSession,
    deleteAcademicSession: exports.deleteAcademicSession,
};
