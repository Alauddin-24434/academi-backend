import { Request, Response, NextFunction } from "express";
import * as applicationTokenService from "../services/applicationToken.service";
import { catchAsync } from "../middlewares/catchAsync";
import { AppError } from "../error/appError";

export const createToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = await applicationTokenService.createApplicationToken(req.body);
  res.status(201).json({ success: true, message: "Token created successfully", data: token });
});

export const getTokenByUserId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = await applicationTokenService.getApplicationTokenByUserId(req.params.userId);
  if (!token) {
    throw new AppError(404, "Token not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Token retrieved successfully", data: token });
});

export const updateToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = await applicationTokenService.updateApplicationToken(req.params.userId, req.body);
  if (!token) {
    throw new AppError(404, "Token not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Token updated successfully", data: token });
});

export const deleteToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = await applicationTokenService.deleteApplicationToken(req.params.userId);
  if (!token) {
    throw new AppError(404, "Token not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Token deleted successfully" });
});
