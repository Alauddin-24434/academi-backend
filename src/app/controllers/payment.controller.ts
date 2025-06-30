import { Request, Response, NextFunction } from "express";
import * as paymentService from "../services/payment.service";
import { catchAsync } from "../middlewares/catchAsync";
import { AppError } from "../error/appError";

export const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payment = await paymentService.createPayment(req.body);
  res.status(201).json({ success: true, data: payment });
});

export const getPaymentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payment = await paymentService.getPaymentById(req.params.id);
  if (!payment) throw new AppError(404, "Payment not found");
  res.json({ success: true, data: payment });
});

export const getAllPayments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payments = await paymentService.getAllPayments();
  res.json({ success: true, data: payments });
});

export const updatePayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payment = await paymentService.updatePayment(req.params.id, req.body);
  if (!payment) throw new AppError(404, "Payment not found");
  res.json({ success: true, data: payment });
});

export const deletePayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payment = await paymentService.deletePayment(req.params.id);
  if (!payment) throw new AppError(404, "Payment not found");
  res.json({ success: true, message: "Payment deleted" });
});