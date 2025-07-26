import express from "express";
import { paymentController } from "./payment.controller";

const router = express.Router();

router.post('/initiate', paymentController.initiatePayment);
router.post('/success', paymentController.paymentSuccess)
router.post('/fail' ,paymentController.paymentFail )
router.get('/cancel',paymentController.paymentCancel )
router.get('/', paymentController.getAllPayments);


export const paymentRoutes = router;
