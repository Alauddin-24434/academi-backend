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
const catchAsyncHandler_1 = require("../../utils/catchAsyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const student_service_1 = require("./student.service");
const createStudent = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const passportPhoto = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    const bodyData = Object.assign(Object.assign({}, req.body), { passportPhoto });
    const result = yield student_service_1.studentService.createStudentService(bodyData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Student created successfully",
        data: result,
    });
}));
const getAllStudents = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.studentService.getAllStudentsService();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Students retrieved successfully",
        data: result,
    });
}));
const getStudentById = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield student_service_1.studentService.getStudentByIdService(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Student retrieved successfully",
        data: result,
    });
}));
const updateStudent = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield student_service_1.studentService.updateStudentService(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Student updated successfully",
        data: result,
    });
}));
const updateStudentStatus = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status, reason } = req.body;
    const result = yield student_service_1.studentService.updateStudentStatusService(id, status, reason);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Student status updated successfully",
        data: result,
    });
}));
const deleteStudent = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield student_service_1.studentService.deleteStudentService(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Student deleted successfully",
    });
}));
exports.studentController = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    updateStudentStatus,
    deleteStudent,
};
