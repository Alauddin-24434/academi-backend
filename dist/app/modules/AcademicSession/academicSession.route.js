"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSessionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicSession_conntroller_1 = require("./academicSession.conntroller");
const router = express_1.default.Router();
router.post('/', academicSession_conntroller_1.academicSessionController.createAcademicSessionHandler);
router.get('/', academicSession_conntroller_1.academicSessionController.getAllAcademicSessionsHandler);
exports.academicSessionRoutes = router;
