import { Request, Response, NextFunction } from "express";
import * as departmentService from "../services/department.service";
import { catchAsync } from "../middlewares/catchAsync";
import { AppError } from "../error/appError";

export const createDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const department = await departmentService.createDepartment(req.body);
  res.status(201).json({ success: true, data: department });
});

export const getDepartmentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const department = await departmentService.getDepartmentById(req.params.id);
  if (!department) throw new AppError(404, "Department not found");
  res.json({ success: true, data: department });
});

export const getAllDepartments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const departments = await departmentService.getAllDepartments();
  res.json({ success: true, data: departments });
});

export const updateDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const department = await departmentService.updateDepartment(req.params.id, req.body);
  if (!department) throw new AppError(404, "Department not found");
  res.json({ success: true, data: department });
});

export const deleteDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const department = await departmentService.deleteDepartment(req.params.id);
  if (!department) throw new AppError(404, "Department not found");
  res.json({ success: true, message: "Department deleted" });
});