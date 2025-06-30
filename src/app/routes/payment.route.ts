import express from "express";
import * as paymentController from "../controllers/payment.controller";

const router = express.Router();

router.post("/", paymentController.createPayment);
router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPaymentById);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

export const paymentRoutes= router;
