"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const staff_validation_1 = require("./staff.validation");
const staff_controller_1 = require("./staff.controller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.validateRequest)(staff_validation_1.createStaffZodSchema), staff_controller_1.staffController.createStaff);
router.get("/", staff_controller_1.staffController.getAllStaff);
router.get("/:id", staff_controller_1.staffController.getStaffById);
router.patch("/:id", (0, validateRequest_1.validateRequest)(staff_validation_1.updateStaffZodSchema), staff_controller_1.staffController.updateStaff);
router.delete("/:id", staff_controller_1.staffController.deleteStaff);
exports.staffRoutes = router;
