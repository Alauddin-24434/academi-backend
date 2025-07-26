import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { departmentService } from "./department.service";

const createDepartment = catchAsync(async (req: Request, res: Response) => {
    const department = await departmentService.createDepartment(req.body);
    res.status(201).json({ status: "success", data: department });
});

const getDepartmentById = catchAsync(async (req: Request, res: Response) => {
    const department = await departmentService.getDepartmentById(req.params.id);
    res.status(200).json({ status: "success", data: department });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
    const departments = await departmentService.getAllDepartments();
    res.status(200).json({ status: "success", data: departments });
});

const updateDepartmentById = catchAsync(async (req: Request, res: Response) => {
    const department = await departmentService.updateDepartmentById(req.params.id, req.body);
    res.status(200).json({ status: "success", data: department });
});

const deleteDepartmentById = catchAsync(async (req: Request, res: Response) => {
    await departmentService.deleteDepartmentById(req.params.id);
    res.status(204).json({ status: "success", data: null });
});

export const departmentController = {
    createDepartment,
    getDepartmentById,
    getAllDepartments,
    updateDepartmentById,
    deleteDepartmentById,
};
