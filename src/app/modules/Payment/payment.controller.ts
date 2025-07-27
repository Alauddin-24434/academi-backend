import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { createPaymentSchema } from "./payment.schema";
import { paymentService } from "./payment.service";
import { generatePaymentHtml } from "../../views/payment.template";
import { v4 as uuidv4 } from 'uuid';
//==================== Initiate Payment =========================//
// This endpoint initiates a new payment and stores it in the database.
const initiatePayment = catchAsync(async (req: Request, res: Response) => {
  const validatedData = createPaymentSchema.parse(req.body);
  const enrichedData = {
    ...validatedData,
    transactionId: uuidv4(),
  };

  const payment = await paymentService.initiatePaymentInDb(enrichedData as any);

  res.status(201).json({ success: true, data: payment });
});

//==================== Payment Success Callback =========================//
// This endpoint is called by the payment gateway when the payment is successful.
// It updates the payment status in the database and shows a success page.
const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.query;
  await paymentService.paymentSuccessInDb(transactionId as string);
  res.send(generatePaymentHtml("success"));
});

//==================== Payment Failure Callback =========================//
// This endpoint is called by the payment gateway when the payment fails.
// It updates the payment status in the database and shows a failure page.
const paymentFail = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.query;
  await paymentService.paymentFailInDb(transactionId as string);
  res.send(generatePaymentHtml("failed"));
});

//==================== Payment Cancellation Callback =========================//
// This endpoint is called by the payment gateway when the user cancels the payment.
// It updates the payment status in the database and shows a cancellation page.
const paymentCancel = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.query;
  await paymentService.paymentCancelDb(transactionId as string);
  res.send(generatePaymentHtml("cancelled"));
});

//==================== Get Single Payment =========================//
// This endpoint retrieves a single payment by its ID.
const getPayment = catchAsync(async (req: Request, res: Response) => {
  const payment = await paymentService.getPaymentById(req.params.id);
  res.status(200).json({ success: true, data: payment });
});

//==================== Get All Payments =========================//
// This endpoint retrieves all payment records from the database.
const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const payments = await paymentService.getAllPayments();
  res.status(200).json({ success: true, data: payments });
});



//==================== Delete Payment =========================//
// This endpoint deletes a payment record by its ID.
const deletePayment = catchAsync(async (req: Request, res: Response) => {
  await paymentService.deletePaymentById(req.params.id);
  res.status(204).send();
});

export const paymentController = {
  initiatePayment,
  getPayment,
  getAllPayments,
  deletePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel
};
