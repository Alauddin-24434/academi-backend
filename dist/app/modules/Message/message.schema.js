"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageSchema = void 0;
const zod_1 = require("zod");
exports.createMessageSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, "Message content is required"),
    group: zod_1.z.string().optional(),
    senderId: zod_1.z.string().min(1),
    receiverId: zod_1.z.string().optional(),
});
