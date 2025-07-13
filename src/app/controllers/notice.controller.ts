import { Request, Response, NextFunction } from "express";
import * as noticeService from "../services/notice.service";
import { catchAsync } from "../middlewares/catchAsync";
import { AppError } from "../error/appError";

export const createNotice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const notice = await noticeService.createNotice(req.body);
  res.status(201).json({ success: true, message: "Notice created successfully", data: notice });
});

export const getNoticeById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const notice = await noticeService.getNoticeById(req.params.id);
  if (!notice) {
    throw new AppError(404, "Notice not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Notice retrieved successfully", data: notice });
});

export const getAllNotices = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const notices = await noticeService.getAllNotices();
  res.status(200).json({ success: true, message: "Notices retrieved successfully", data: notices });
});

export const updateNotice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const notice = await noticeService.updateNotice(req.params.id, req.body);
  if (!notice) {
    throw new AppError(404, "Notice not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Notice updated successfully", data: notice });
});

export const deleteNotice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const notice = await noticeService.deleteNotice(req.params.id);
  if (!notice) {
    throw new AppError(404, "Notice not found", "NotFoundError");
  }
  res.status(200).json({ success: true, message: "Notice deleted successfully" });
});
