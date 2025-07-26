"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAcademicSessionSchema = void 0;
const zod_1 = require("zod");
exports.createAcademicSessionSchema = zod_1.z.object({
    name: zod_1.z.string().min(4, "Session name is required"), // e.g. "2020-21"
});
