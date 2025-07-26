"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cloudinary_1 = require("../../lib/cloudinary");
const student_controller_1 = require("./student.controller");
const router = express_1.default.Router();
router.post("/", cloudinary_1.upload.single("passportPhoto"), student_controller_1.studentController.createStudent);
router.get("/", student_controller_1.studentController.getAllStudents);
router.get("/:id", student_controller_1.studentController.getStudent);
router.get("/user/:userId", student_controller_1.studentController.getStudentsByUserId); // এখানে user id
router.put("/:id", student_controller_1.studentController.updateStudent);
exports.studentRoutes = router;
