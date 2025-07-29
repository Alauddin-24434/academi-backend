"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const student_validation_1 = require("./student.validation");
const student_controller_1 = require("./student.controller");
const cloudinary_1 = require("../../lib/cloudinary");
const router = express_1.default.Router();
router.post("/", cloudinary_1.upload.single("passportPhoto"), (0, validateRequest_1.validateRequest)(student_validation_1.createStudentZodSchema), student_controller_1.studentController.createStudent);
router.get("/", student_controller_1.studentController.getAllStudents);
router.get("/:id", student_controller_1.studentController.getStudentById);
router.patch("/:id", (0, validateRequest_1.validateRequest)(student_validation_1.updateStudentZodSchema), student_controller_1.studentController.updateStudent);
router.patch("/:id/status", (0, validateRequest_1.validateRequest)(student_validation_1.updateStudentStatusZodSchema), student_controller_1.studentController.updateStudentStatus);
router.delete("/:id", student_controller_1.studentController.deleteStudent);
exports.studentRoutes = router;
