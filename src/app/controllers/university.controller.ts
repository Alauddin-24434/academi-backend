import { Request, Response, NextFunction } from "express";
import * as universityService from "../services/university.service";
import { catchAsync } from "../middlewares/catchAsync";
import { AppError } from "../error/appError";

export const createUniversity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const university = await universityService.createUniversity(req.body);
  res.status(201).json({ success: true, message: "University created successfully", data: university });
});

export const getUniversityById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const university = await universityService.getUniversityById(req.params.id);
  if (!university) {
    throw new AppError(404, "University not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "University retrieved successfully", data: university });
});

export const getAllUniversities = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const universities = await universityService.getAllUniversities();
  res.status(200).json({ success: true, message: "Universities retrieved successfully", data: universities });
});

export const updateUniversity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const university = await universityService.updateUniversity(req.params.id, req.body);
  if (!university) {
    throw new AppError(404, "University not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "University updated successfully", data: university });
});

export const deleteUniversity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const university = await universityService.deleteUniversity(req.params.id);
  if (!university) {
    throw new AppError(404, "University not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "University deleted successfully" });
});
