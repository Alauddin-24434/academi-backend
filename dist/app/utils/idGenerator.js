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
exports.generateStudentId = generateStudentId;
// src/utils/idGenerator.ts
const prisma_1 = require("../lib/prisma");
function getPrefix(degree) {
    if (degree && degree.toUpperCase() === "HONOURS") {
        return "HON";
    }
    return "STD";
}
function generateStudentId(degree, session) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!session)
            throw new Error("Session is required for studentId generation");
        const year = session.split("-")[0];
        const prefix = getPrefix(degree);
        const count = yield prisma_1.prisma.student.count({
            where: {
                studentId: {
                    startsWith: `${prefix}${year}`,
                },
            },
        });
        const serial = (count + 1).toString().padStart(3, "0");
        return `${prefix}${year}-${serial}`;
    });
}
