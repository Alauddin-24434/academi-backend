"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
// routes/admin.route.ts
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.validateRequest)(admin_validation_1.createAdminZodSchema), admin_controller_1.adminController.createAdmin);
router.get("/", admin_controller_1.adminController.getAllAdmins);
router.get("/:id", admin_controller_1.adminController.getAdminById);
exports.adminRoutes = router;
