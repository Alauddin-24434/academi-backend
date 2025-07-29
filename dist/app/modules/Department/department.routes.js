"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const department_controller_1 = require("./department.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const department_validation_1 = require("./department.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.validateRequest)(department_validation_1.createDepartmentZodSchema), department_controller_1.departmentController.createDepartment);
router.get('/', department_controller_1.departmentController.getAllDepartments);
router.patch('/:id', department_controller_1.departmentController.updateDepartmentById);
router.delete('/:id', department_controller_1.departmentController.deleteDepartmentById);
exports.departmentRoutes = router;
