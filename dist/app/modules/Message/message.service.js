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
exports.messageService = void 0;
const AppError_1 = require("../../error/AppError");
const prisma_1 = require("../../lib/prisma");
const createMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const user = yield prisma_1.prisma.user.findUnique({ where: { id: data.senderId } });
    if (!user)
        throw new AppError_1.AppError("Sender not found", 404);
    return prisma_1.prisma.message.create({
        data,
        include: {
            sender: true,
        },
    });
});
const getMessageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield prisma_1.prisma.message.findUnique({
        where: { id },
        include: { sender: true },
    });
    if (!message)
        throw new AppError_1.AppError("Message not found", 404);
    return message;
});
const getAllMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.message.findMany({
        include: { sender: true },
        orderBy: { createdAt: "desc" },
    });
});
const updateMessageById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield prisma_1.prisma.message.findUnique({ where: { id } });
    if (!message)
        throw new AppError_1.AppError("Message not found", 404);
    return prisma_1.prisma.message.update({
        where: { id },
        data,
    });
});
const deleteMessageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield prisma_1.prisma.message.findUnique({ where: { id } });
    if (!message)
        throw new AppError_1.AppError("Message not found", 404);
    return prisma_1.prisma.message.delete({ where: { id } });
});
exports.messageService = {
    createMessage,
    getMessageById,
    getAllMessages,
    updateMessageById,
    deleteMessageById,
};
