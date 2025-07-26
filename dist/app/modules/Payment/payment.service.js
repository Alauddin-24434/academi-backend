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
exports.paymentService = void 0;
const AppError_1 = require("../../error/AppError");
const initiate_payment_1 = require("../../integrations/aamarpay/initiate.payment");
const prisma_1 = require("../../lib/prisma");
const verify_payment_1 = require("../../integrations/aamarpay/verify.payment");
//============================ Initiate Payment in Database ==============================//
// Finds student by ID, creates a pending payment record, then calls external payment gateway.
const initiatePaymentInDb = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, paymentDate, studentId, transactionId } = paymentData;
    try {
        const result = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            // 1. Find student with user details
            const user = yield tx.user.findFirst({
                where: { studentId: studentId },
                include: { student: true }
            });
            if (!user)
                throw new Error("User not found");
            // 2. Create payment record with status PENDING
            const payment = yield tx.payment.create({
                data: {
                    amount,
                    paymentDate: new Date(paymentDate),
                    transactionId,
                    status: "PENDING",
                    studentId,
                },
            });
            // 3. Call external payment gateway to initiate payment
            const paymentInitiateResult = yield (0, initiate_payment_1.initiatePayment)({
                name: user.fullName,
                email: user.email,
                phone: (_a = user === null || user === void 0 ? void 0 : user.student) === null || _a === void 0 ? void 0 : _a.phone,
                amount,
                transactionId,
            });
            console.log("paymentResult", paymentInitiateResult);
            return { payment, paymentInitiateResult };
        }));
        return result;
    }
    catch (error) {
        console.error("❌ Payment transaction failed:", error);
        throw new Error("Payment initiation failed");
    }
});
//============================ Payment Success Handling ==============================//
// Verifies payment status externally and updates payment record to COMPLETE or FAILED.
const paymentSuccessInDb = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. Verify payment status with external gateway 
        const verificationResult = yield (0, verify_payment_1.verifyPayment)(transactionId);
        if (!verificationResult)
            throw new AppError_1.AppError("Payment verification failed", 400);
        // 2. Find payment record by transactionId 
        const payment = yield tx.payment.findUnique({ where: { transactionId } });
        if (!payment)
            throw new AppError_1.AppError("Payment record not found", 404);
        // 3. Determine new payment status 
        if (verificationResult.pay_status === "Successful") {
            // ✅ 3.1 Approve student if payment successful
            if (payment.studentId) {
                const student = yield tx.student.findUnique({ where: { id: payment.studentId } });
                if (!student)
                    throw new AppError_1.AppError("Student not found", 404);
                yield tx.student.update({
                    where: { id: payment.studentId },
                    data: { status: "APPROVE" },
                });
            }
        }
        // 4. Update payment status in DB
        yield tx.payment.update({
            where: { id: payment.id },
            data: { status: "COMPLETE" },
        });
        // 5. Return the transactionId as confirmation
        return transactionId;
    }));
});
//============================ Payment Failure Handling ==============================//
// Verifies failed payment and updates the payment record accordingly.
const paymentFailInDb = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const verificationResult = yield (0, verify_payment_1.verifyPayment)(transactionId);
        console.log(verificationResult);
        if (!verificationResult)
            throw new AppError_1.AppError("Payment verification failed", 400);
        const payment = yield tx.payment.findUnique({ where: { transactionId } });
        if (!payment)
            throw new AppError_1.AppError("Payment record not found", 404);
        // Always mark as FAILED here
        yield tx.payment.update({
            where: { id: payment.id },
            data: { status: "FAILED" },
        });
        return transactionId;
    }));
});
//============================ Payment Cancellation Handling ==============================//
// Updates payment status to CANCELED when user cancels the payment.
const paymentCancelDb = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const payment = yield tx.payment.findUnique({ where: { transactionId } });
        if (!payment)
            throw new AppError_1.AppError("Payment record not found", 404);
        yield tx.payment.update({
            where: { id: payment.id },
            data: { status: "CANCELED" },
        });
        return transactionId;
    }));
});
//============================ Get Payment By ID ==============================//
// Retrieves a single payment by its unique ID.
const getPaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield prisma_1.prisma.payment.findUnique({ where: { id } });
    if (!payment)
        throw new AppError_1.AppError("Payment not found", 404);
    return payment;
});
//============================ Get All Payments ==============================//
// Retrieves all payment records from the database.
const getAllPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.payment.findMany();
});
//============================ Delete Payment By ID ==============================//
// Deletes a payment record by ID.
const deletePaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield prisma_1.prisma.payment.findUnique({ where: { id } });
    if (!payment)
        throw new AppError_1.AppError("Payment not found", 404);
    return prisma_1.prisma.payment.delete({ where: { id } });
});
exports.paymentService = {
    initiatePaymentInDb,
    getPaymentById,
    getAllPayments,
    deletePaymentById,
    paymentSuccessInDb,
    paymentFailInDb,
    paymentCancelDb,
};
