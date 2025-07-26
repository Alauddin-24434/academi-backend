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
exports.userController = void 0;
const catchAsyncHandler_1 = require("../../middleware/catchAsyncHandler");
const jwt_1 = require("../../utils/jwt");
const cookieOptions_1 = require("../../utils/cookieOptions");
const prisma_1 = require("../../lib/prisma");
const user_service_1 = require("./user.service");
const user_schema_1 = require("./user.schema");
// ================================Login user==================================================
const loginUser = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = user_schema_1.loginSchema.parse(req.body);
    const user = yield user_service_1.userService.loginUserByEmail(validatedData);
    // success
    const payload = { id: user.id, role: user.role };
    const accessToken = (0, jwt_1.createAccessToken)(payload);
    const refreshToken = (0, jwt_1.createRefreshToken)(payload);
    res.cookie("refreshToken", refreshToken, Object.assign(Object.assign({}, cookieOptions_1.cookieOptions), { maxAge: 7 * 24 * 60 * 60 * 1000 }));
    res.json({
        success: true,
        message: "Login successful",
        data: { user, accessToken },
    });
}));
// ======================================Refresh token verify and return acces token ===========================================
const refreshAccessToken = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshTokenRaw = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken) || req.headers["x-refresh-token"];
    if (!refreshTokenRaw) {
        return res.status(401).json({ success: false, message: "Refresh token missing" });
    }
    // ✅ Verify the refresh token
    let decoded;
    try {
        decoded = (0, jwt_1.verifyRefreshToken)(refreshTokenRaw);
    }
    catch (err) {
        return res.status(403).json({ success: false, message: "Invalid or expired refresh token" });
    }
    // ✅ Find the user
    const user = yield prisma_1.prisma.user.findUnique({
        where: { id: decoded.id },
    });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    // ✅ Generate new access token
    const payload = { id: user.id, role: user.role };
    const accessToken = (0, jwt_1.createAccessToken)(payload);
    return res.status(200).json({
        success: true,
        message: "Access token refreshed successfully",
        data: { user, accessToken },
    });
}));
// =============================================================Get all user==============================================
const getAllUsers = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUsers(req.query);
    const response = {
        success: true,
        message: "Users retrieved successfully",
        data: result,
    };
    res.json(response);
}));
//==============================================================Get user byID=================================================
const getUserById = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_service_1.userService.getUserById(id);
    const response = {
        success: true,
        message: "User retrieved successfully",
        data: user,
    };
    res.json(response);
}));
// ============================================================updateUser======================================================
const updateUser = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const validatedData = user_schema_1.updateUserSchema.parse(req.body);
    const user = yield user_service_1.userService.updateUser(id, validatedData);
    const payload = { id: user.id, role: user.role };
    const accessToken = (0, jwt_1.createAccessToken)(payload);
    const refreshToken = (0, jwt_1.createRefreshToken)(payload);
    res.cookie("refreshToken", refreshToken, Object.assign(Object.assign({}, cookieOptions_1.cookieOptions), { maxAge: 7 * 24 * 60 * 60 * 1000 }));
    res.cookie("accessToken", accessToken, Object.assign(Object.assign({}, cookieOptions_1.cookieOptions), { maxAge: 15 * 60 * 1000 }));
    const response = {
        success: true,
        message: "User updated successfully",
        data: { user, accessToken },
    };
    res.json(response);
}));
// ✅ Final Export Object
exports.userController = {
    loginUser,
    refreshAccessToken,
    getAllUsers,
    getUserById,
    updateUser,
};
