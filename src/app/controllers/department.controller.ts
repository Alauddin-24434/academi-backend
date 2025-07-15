import { Request, Response, NextFunction } from "express";
import * as departmentService from "../services/department.service";
import { catchAsync } from "../middlewares/catchAsync";
import { AppError } from "../error/appError";

export const createDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log("dep", req.body)
  const department = await departmentService.createDepartment(req.body);
  console.log(department)
  res.status(201).json({ success: true, message: "Department created successfully", data: department });
});

export const getDepartmentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const department = await departmentService.getDepartmentById(req.params.id);
  if (!department) {
    throw new AppError(404, "Department not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Department retrieved successfully", data: department });
});

export const getAllDepartments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const departments = await departmentService.getAllDepartments();
  res.status(200).json({ success: true, message: "Departments retrieved successfully", data: departments });
});

export const updateDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const department = await departmentService.updateDepartment(req.params.id, req.body);
  if (!department) {
    throw new AppError(404, "Department not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Department updated successfully", data: department });
});

export const deleteDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const department = await departmentService.deleteDepartment(req.params.id);
  if (!department) {
    throw new AppError(404, "Department not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Department deleted successfully" });
});
