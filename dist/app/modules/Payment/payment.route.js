"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const payment_validation_1 = require("./payment.validation");
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
// Payment routes
router.post('/initiate', (0, validateRequest_1.validateRequest)(payment_validation_1.createPaymentZodSchema), payment_controller_1.paymentController.initiatePayment);
router.post('/success', payment_controller_1.paymentController.paymentSuccess);
router.post('/fail', payment_controller_1.paymentController.paymentFail);
router.get('/cancel', payment_controller_1.paymentController.paymentCancel);
router.delete("/:id", payment_controller_1.paymentController.deletePayment);
// Payment type routes
router.post("/types", (0, validateRequest_1.validateRequest)(payment_validation_1.createPaymentTypeZodSchema), payment_controller_1.paymentController.createPaymentType);
router.get("/types", payment_controller_1.paymentController.getAllPaymentTypes);
router.get("/types/:id", payment_controller_1.paymentController.getPaymentTypeById);
router.patch("/types/:id", (0, validateRequest_1.validateRequest)(payment_validation_1.updatePaymentTypeZodSchema), payment_controller_1.paymentController.updatePaymentType);
router.delete("/types/:id", payment_controller_1.paymentController.deletePaymentType);
exports.paymentRoutes = router;
