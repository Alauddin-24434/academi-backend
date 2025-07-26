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
exports.facultyController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const faculty_service_1 = require("./faculty.service");
const createFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield faculty_service_1.facultyService.createFaculty(req.body);
    res.status(201).json({ status: "success", data: faculty });
}));
const getFacultyById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield faculty_service_1.facultyService.getFacultyById(req.params.id);
    res.status(200).json({ status: "success", data: faculty });
}));
const getAllFaculties = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const faculties = yield faculty_service_1.facultyService.getAllFaculties();
    res.status(200).json({ status: "success", data: faculties });
}));
const updateFacultyById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield faculty_service_1.facultyService.updateFacultyById(req.params.id, req.body);
    res.status(200).json({ status: "success", data: faculty });
}));
const deleteFacultyById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield faculty_service_1.facultyService.deleteFacultyById(req.params.id);
    res.status(204).json({ status: "success", data: null });
}));
exports.facultyController = {
    createFaculty,
    getFacultyById,
    getAllFaculties,
    updateFacultyById,
    deleteFacultyById,
};
