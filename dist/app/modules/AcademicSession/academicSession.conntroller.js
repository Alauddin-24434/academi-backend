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
exports.academicSessionController = exports.deleteAcademicSession = exports.updateAcademicSession = exports.getSingleAcademicSession = exports.getAllAcademicSessions = exports.createAcademicSession = void 0;
const catchAsyncHandler_1 = require("../../utils/catchAsyncHandler");
const academicSession_service_1 = require("./academicSession.service");
const sendResponse_1 = require("../../utils/sendResponse");
exports.createAcademicSession = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSession_service_1.academicSessionService.createAcademicSession(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Academic session created successfully",
        data: result,
    });
}));
exports.getAllAcademicSessions = (0, catchAsyncHandler_1.catchAsyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSession_service_1.academicSessionService.getAllAcademicSessions();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All academic sessions fetched",
        data: result,
    });
}));
exports.getSingleAcademicSession = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSession_service_1.academicSessionService.getSingleAcademicSession(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Academic session fetched",
        data: result,
    });
}));
exports.updateAcademicSession = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSession_service_1.academicSessionService.updateAcademicSession(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Academic session updated",
        data: result,
    });
}));
exports.deleteAcademicSession = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSession_service_1.academicSessionService.deleteAcademicSession(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Academic session deleted (soft)",
        data: result,
    });
}));
exports.academicSessionController = {
    createAcademicSession: exports.createAcademicSession,
    getSingleAcademicSession: exports.getSingleAcademicSession,
    getAllAcademicSessions: exports.getAllAcademicSessions,
    updateAcademicSession: exports.updateAcademicSession,
    deleteAcademicSession: exports.deleteAcademicSession
};
