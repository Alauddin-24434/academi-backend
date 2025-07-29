import express from "express"
import { validateRequest } from "../../middleware/validateRequest"
import {

  createPaymentTypeZodSchema,
  createPaymentZodSchema,
  updatePaymentTypeZodSchema,
} from "./payment.validation"
import { paymentController } from "./payment.controller"

const router = express.Router()

// Payment routes

router.post('/initiate', validateRequest(createPaymentZodSchema), paymentController.initiatePayment);
router.post('/success', paymentController.paymentSuccess)
router.post('/fail', paymentController.paymentFail)
router.get('/cancel', paymentController.paymentCancel)
router.delete("/:id", paymentController.deletePayment)

// Payment type routes
router.post("/types", validateRequest(createPaymentTypeZodSchema), paymentController.createPaymentType)
router.get("/types", paymentController.getAllPaymentTypes)
router.get("/types/:id", paymentController.getPaymentTypeById)
router.patch("/types/:id", validateRequest(updatePaymentTypeZodSchema), paymentController.updatePaymentType)
router.delete("/types/:id", paymentController.deletePaymentType)

export const paymentRoutes = router
