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
exports.departmentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const department_service_1 = require("./department.service");
const createDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield department_service_1.departmentService.createDepartment(req.body);
    res.status(201).json({ status: "success", data: department });
}));
const getDepartmentById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield department_service_1.departmentService.getDepartmentById(req.params.id);
    res.status(200).json({ status: "success", data: department });
}));
const getAllDepartments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departments = yield department_service_1.departmentService.getAllDepartments();
    res.status(200).json({ status: "success", data: departments });
}));
const updateDepartmentById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield department_service_1.departmentService.updateDepartmentById(req.params.id, req.body);
    res.status(200).json({ status: "success", data: department });
}));
const deleteDepartmentById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield department_service_1.departmentService.deleteDepartmentById(req.params.id);
    res.status(204).json({ status: "success", data: null });
}));
exports.departmentController = {
    createDepartment,
    getDepartmentById,
    getAllDepartments,
    updateDepartmentById,
    deleteDepartmentById,
};
