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
exports.studentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const student_schema_1 = require("./student.schema");
const student_service_1 = require("./student.service");
const AppError_1 = require("../../error/AppError");
const jwt_1 = require("../../utils/jwt");
const cookieOptions_1 = require("../../utils/cookieOptions");
//============================================ create Student and Signup==============================================================
const createStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = student_schema_1.createStudentSchema.parse(req.body);
    // Passport photo validation
    if (!req.file || !req.file.path) {
        throw new AppError_1.AppError("Passport photo is required", 400);
    }
    const passportPhoto = req.file.path;
    // Prepare student data
    const studentData = Object.assign(Object.assign({}, validatedData), { passportPhoto });
    // Create student and update user role inside transaction
    const result = yield student_service_1.studentService.createStudent(studentData);
    const { student, user } = result;
    // success
    const payload = { id: user.id, role: user.role };
    const accessToken = (0, jwt_1.createAccessToken)(payload);
    const refreshToken = (0, jwt_1.createRefreshToken)(payload);
    res.cookie("refreshToken", refreshToken, Object.assign(Object.assign({}, cookieOptions_1.cookieOptions), { maxAge: 7 * 24 * 60 * 60 * 1000 }));
    res.json({
        success: true,
        message: "Create Student and and signup sucesfully",
        data: { user, accessToken, student },
    });
}));
// ======================================Get student byId===============================================
const getStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_service_1.studentService.getStudentById(req.params.id);
    res.status(200).json({ success: true, data: student });
}));
// =====================================get Student byUserid=================================================
const getStudentsByUserId = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_service_1.studentService.getStudentsByUserId(req.params.userId);
    res.status(200).json({ success: true, data: student });
}));
// ===============================================Get All students=========================================
const getAllStudents = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield student_service_1.studentService.getAllStudents();
    res.status(200).json({ success: true, data: students });
}));
// ================================================update student====================================
const updateStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = student_schema_1.updateStudentSchema.parse(req.body);
    const updatedStudent = yield student_service_1.studentService.updateStudentById(req.params.id, validatedData);
    res.status(200).json({ success: true, data: updatedStudent });
}));
exports.studentController = {
    createStudent,
    getStudent,
    getAllStudents,
    updateStudent,
    getStudentsByUserId,
};
