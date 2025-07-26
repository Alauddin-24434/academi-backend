"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const payment_schema_1 = require("./payment.schema");
const payment_service_1 = require("./payment.service");
const payment_template_1 = require("../../views/payment.template");
const uuid_1 = require("uuid");
//==================== Initiate Payment =========================//
// This endpoint initiates a new payment and stores it in the database.
const initiatePayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = payment_schema_1.createPaymentSchema.parse(req.body);
    const enrichedData = Object.assign(Object.assign({}, validatedData), { transactionId: (0, uuid_1.v4)() });
    const payment = yield payment_service_1.paymentService.initiatePaymentInDb(enrichedData);
    res.status(201).json({ success: true, data: payment });
}));
//==================== Payment Success Callback =========================//
// This endpoint is called by the payment gateway when the payment is successful.
// It updates the payment status in the database and shows a success page.
const paymentSuccess = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    yield payment_service_1.paymentService.paymentSuccessInDb(transactionId);
    res.send((0, payment_template_1.generatePaymentHtml)("success"));
}));
//==================== Payment Failure Callback =========================//
// This endpoint is called by the payment gateway when the payment fails.
// It updates the payment status in the database and shows a failure page.
const paymentFail = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    yield payment_service_1.paymentService.paymentFailInDb(transactionId);
    res.send((0, payment_template_1.generatePaymentHtml)("failed"));
}));
//==================== Payment Cancellation Callback =========================//
// This endpoint is called by the payment gateway when the user cancels the payment.
// It updates the payment status in the database and shows a cancellation page.
const paymentCancel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    yield payment_service_1.paymentService.paymentCancelDb(transactionId);
    res.send((0, payment_template_1.generatePaymentHtml)("cancelled"));
}));
//==================== Get Single Payment =========================//
// This endpoint retrieves a single payment by its ID.
const getPayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield payment_service_1.paymentService.getPaymentById(req.params.id);
    res.status(200).json({ success: true, data: payment });
}));
//==================== Get All Payments =========================//
// This endpoint retrieves all payment records from the database.
const getAllPayments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield payment_service_1.paymentService.getAllPayments();
    res.status(200).json({ success: true, data: payments });
}));
//==================== Delete Payment =========================//
// This endpoint deletes a payment record by its ID.
const deletePayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield payment_service_1.paymentService.deletePaymentById(req.params.id);
    res.status(204).send();
}));
exports.paymentController = {
    initiatePayment,
    getPayment,
    getAllPayments,
    deletePayment,
    paymentSuccess,
    paymentFail,
    paymentCancel
};
