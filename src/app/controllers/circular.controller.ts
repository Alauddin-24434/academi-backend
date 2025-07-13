import { Request, Response, NextFunction } from "express";
import * as circularService from "../services/circular.service";
import { catchAsync } from "../middlewares/catchAsync";
import { AppError } from "../error/appError";

export const createCircular = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const circular = await circularService.createCircular(req.body);
  res.status(201).json({ success: true, message: "Circular created successfully", data: circular });
});

export const getCircularById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const circular = await circularService.getCircularById(req.params.id);
  if (!circular) {
    throw new AppError(404, "Circular not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Circular retrieved successfully", data: circular });
});

export const getAllCirculars = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const circulars = await circularService.getAllCirculars();
  res.status(200).json({ success: true, message: "Circulars retrieved successfully", data: circulars });
});

export const updateCircular = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const circular = await circularService.updateCircular(req.params.id, req.body);
  if (!circular) {
    throw new AppError(404, "Circular not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Circular updated successfully", data: circular });
});

export const deleteCircular = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const circular = await circularService.deleteCircular(req.params.id);
  if (!circular) {
    throw new AppError(404, "Circular not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Circular deleted successfully" });
});
