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
exports.staffController = void 0;
const catchAsyncHandler_1 = require("../../utils/catchAsyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const staff_service_1 = require("./staff.service");
const createStaff = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield staff_service_1.staffService.createStaffService(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Staff member created successfully",
        data: result,
    });
}));
const getAllStaff = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield staff_service_1.staffService.getAllStaffService();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Staff members retrieved successfully",
        data: result,
    });
}));
const getStaffById = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield staff_service_1.staffService.getStaffByIdService(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Staff member retrieved successfully",
        data: result,
    });
}));
const updateStaff = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield staff_service_1.staffService.updateStaffService(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Staff member updated successfully",
        data: result,
    });
}));
const deleteStaff = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield staff_service_1.staffService.deleteStaffService(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Staff member deleted successfully",
    });
}));
exports.staffController = {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
};
