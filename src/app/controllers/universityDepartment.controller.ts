import { Request, Response, NextFunction } from "express";

import { catchAsync } from "../middlewares/catchAsync";
import { AppError } from "../error/appError";
import { departmentServices } from "../services/universityDepartmnet.service";

 const createDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const department = await departmentServices.createDepartment(req.body);
  console.log(department)
  res.status(201).json({ success: true, message: "Department created successfully", data: department });
});

 const getDepartmentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const department = await departmentServices.getDepartmentById(req.params.id);
  if (!department) {
    throw new AppError(404, "Department not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Department retrieved successfully", data: department });
});

 const getAllDepartments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const departments = await departmentServices.getAllDepartments();
  console.log("dep",departments)
  res.status(200).json({ success: true, message: "Departments retrieved successfully", data: departments });
});

 const updateDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const department = await departmentServices.updateDepartment(req.params.id, req.body);
  if (!department) {
    throw new AppError(404, "Department not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Department updated successfully", data: department });
});

 const deleteDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const department = await departmentServices.deleteDepartment(req.params.id);
  if (!department) {
    throw new AppError(404, "Department not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Department deleted successfully" });
});


export const universityDepartmentController={
    createDepartment,
    getDepartmentById,
    getAllDepartments,
    updateDepartment,
    deleteDepartment

}