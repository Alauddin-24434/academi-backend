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
exports.academicSessionService = void 0;
const AppError_1 = require("../../error/AppError");
const prisma_1 = require("../../lib/prisma");
const createAcademicSession = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.prisma.academicSession.findUnique({
        where: { name: input.name }
    });
    if (isExist) {
        throw new AppError_1.AppError("Name alredy exist", 400);
    }
    const session = yield prisma_1.prisma.academicSession.create({
        data: input,
    });
    return session;
});
const getAllAcademicSessions = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.academicSession.findMany();
});
const getAcademicSessionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.academicSession.findUnique({ where: { id } });
});
exports.academicSessionService = {
    createAcademicSession,
    getAcademicSessionById,
    getAllAcademicSessions
};
