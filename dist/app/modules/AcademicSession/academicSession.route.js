"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSessionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const academicSession_validition_1 = require("./academicSession.validition");
const academicSession_conntroller_1 = require("./academicSession.conntroller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.validateRequest)(academicSession_validition_1.createAcademicSessionZodSchema), academicSession_conntroller_1.academicSessionController.createAcademicSession);
router.get("/", academicSession_conntroller_1.academicSessionController.getAllAcademicSessions);
router.get("/:id", academicSession_conntroller_1.academicSessionController.getSingleAcademicSession);
router.patch("/:id", (0, validateRequest_1.validateRequest)(academicSession_validition_1.updateAcademicSessionZodSchema), academicSession_conntroller_1.academicSessionController.updateAcademicSession);
router.delete("/:id", academicSession_conntroller_1.academicSessionController.deleteAcademicSession);
exports.academicSessionRoutes = router;
