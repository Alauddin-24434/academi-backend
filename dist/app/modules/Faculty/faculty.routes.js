"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const faculty_schema_1 = require("./faculty.schema");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.validateRequest)(faculty_schema_1.createFacultyZodSchema), faculty_controller_1.facultyController.createFaculty);
router.get('/', faculty_controller_1.facultyController.getAllFaculties);
exports.facultyRoutes = router;
