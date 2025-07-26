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
exports.messageController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const message_schema_1 = require("./message.schema");
const message_service_1 = require("./message.service");
const socket_1 = require("../../socket");
const createMessage = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = message_schema_1.createMessageSchema.parse(req.body);
    const message = yield message_service_1.messageService.createMessage(validatedData);
    const io = (0, socket_1.getIO)();
    if (validatedData.group) {
        // Emit to group
        io.to(validatedData.group).emit("new-message", message);
    }
    else if (validatedData.receiverId) {
        // Emit to receiver
        io.to(validatedData.receiverId).emit("new-message", message);
    }
    res.status(201).json({ success: true, data: message });
}));
const getMessage = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield message_service_1.messageService.getMessageById(req.params.id);
    res.status(200).json({ success: true, data: message });
}));
const getAllMessages = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield message_service_1.messageService.getAllMessages();
    res.status(200).json({ success: true, data: messages });
}));
const updateMessage = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = message_schema_1.createMessageSchema.partial().parse(req.body);
    const updatedMessage = yield message_service_1.messageService.updateMessageById(req.params.id, validatedData);
    res.status(200).json({ success: true, data: updatedMessage });
}));
const deleteMessage = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield message_service_1.messageService.deleteMessageById(req.params.id);
    res.status(204).send();
}));
exports.messageController = {
    createMessage,
    getMessage,
    getAllMessages,
    updateMessage,
    deleteMessage,
};
