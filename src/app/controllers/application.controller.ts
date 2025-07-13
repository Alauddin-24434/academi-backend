import { Request, Response, NextFunction } from "express";
import * as applicationService from "../services/application.service";
import { catchAsync } from "../middlewares/catchAsync";
import { AppError } from "../error/appError";

export const createApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const application = await applicationService.createApplication(req.body);
  res.status(201).json({ success: true, message: "Application created successfully", data: application });
});

export const getApplicationById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const application = await applicationService.getApplicationById(req.params.id);
  if (!application) {
    throw new AppError(404, "Application not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Application retrieved successfully", data: application });
});

export const getAllApplications = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const applications = await applicationService.getAllApplications();
  res.status(200).json({ success: true, message: "Applications retrieved successfully", data: applications });
});

export const updateApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const application = await applicationService.updateApplication(req.params.id, req.body);
  if (!application) {
    throw new AppError(404, "Application not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Application updated successfully", data: application });
});

export const deleteApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const application = await applicationService.deleteApplication(req.params.id);
  if (!application) {
    throw new AppError(404, "Application not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Application deleted successfully" });
});
