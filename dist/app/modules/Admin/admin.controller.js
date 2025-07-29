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
exports.adminController = void 0;
const catchAsyncHandler_1 = require("../../utils/catchAsyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const admin_service_1 = require("./admin.service");
const createAdmin = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.createAdminService(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Admin created successfully",
        data: result,
    });
}));
const getAllAdmins = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.getAllAdminsService();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Admins retrieved successfully",
        data: result,
    });
}));
const getAdminById = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.adminService.getAdminByIdService(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Admin retrieved successfully",
        data: result,
    });
}));
exports.adminController = {
    createAdmin,
    getAdminById,
    getAllAdmins
};
