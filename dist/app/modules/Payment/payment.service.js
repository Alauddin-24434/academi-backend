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
const prisma_1 = require("../../../../generated/prisma");
const AppError_1 = require("../../error/AppError");
const prisma_2 = require("../../lib/prisma");
const initiate_payment_1 = require("../../paymentIntegration/initiate.payment");
const verifyPayment_1 = require("../../paymentIntegration/verifyPayment");
//============================ Initiate Payment in Database ==============================//
// Finds student by ID, creates a pending payment record, then calls external payment gateway.
const initiatePaymentInDb = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, paymentDate, userId, transactionId, paymentTypeId, } = paymentData;
    try {
        const result = yield prisma_2.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            // 1. Find student with user details
            const user = yield tx.user.findFirst({
                where: { id: userId },
                include: { student: true }
            });
            if (!user)
                throw new Error("User not found");
            // 2. Create payment record with status PENDING
            const pay = yield tx.payment.create({
                data: {
                    amount,
                    paymentDate,
                    transactionId,
                    paymentTypeId,
                    userId,
                    status: "PENDING",
                },
            });
            console.log(pay);
            // 3. Call external payment gateway to initiate payment
            const paymentInitiateResult = yield (0, initiate_payment_1.initiatePayment)({
                name: user.name,
                email: user.email,
                phone: user.phone,
                amount,
                transactionId: transactionId,
            });
            return paymentInitiateResult;
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
    return yield prisma_2.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. Verify payment status with external gateway 
        const verificationResult = yield (0, verifyPayment_1.verifyPayment)(transactionId);
        if (!verificationResult)
            throw new AppError_1.AppError(400, "Payment verification failed");
        // 2. Find payment record by transactionId 
        const payment = yield tx.payment.findUnique({ where: { transactionId } });
        if (!payment)
            throw new AppError_1.AppError(404, "Payment record not found");
        // 3. If successful, approve student
        if (verificationResult.pay_status === "Successful") {
            const student = yield tx.student.findUnique({ where: { userId: payment.userId } });
            if (!student)
                throw new AppError_1.AppError(404, "Student not found");
            yield tx.student.update({
                where: { id: student.id }, // ✅ Corrected line
                data: { status: prisma_1.StudentStatus.APPROVED },
            });
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
    return yield prisma_2.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const verificationResult = yield (0, verifyPayment_1.verifyPayment)(transactionId);
        console.log(verificationResult);
        if (!verificationResult)
            throw new AppError_1.AppError(400, "Payment verification failed");
        const payment = yield tx.payment.findUnique({ where: { transactionId } });
        if (!payment)
            throw new AppError_1.AppError(404, "Payment record not found");
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
    return yield prisma_2.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const payment = yield tx.payment.findUnique({ where: { transactionId } });
        if (!payment)
            throw new AppError_1.AppError(404, "Payment record not found");
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
    const payment = yield prisma_2.prisma.payment.findUnique({ where: { id } });
    if (!payment)
        throw new AppError_1.AppError(404, "Payment not found");
    return payment;
});
//============================ Get All Payments ==============================//
// Retrieves all payment records from the database.
const getAllPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_2.prisma.payment.findMany();
});
const deletePaymentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPayment = yield prisma_2.prisma.payment.findUnique({
        where: { id },
    });
    if (!existingPayment) {
        throw new AppError_1.AppError(404, "Payment not found");
    }
    return prisma_2.prisma.payment.delete({
        where: { id },
    });
});
// Payment Type Services
const createPaymentTypeService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if payment type name already exists
    const existingPaymentType = yield prisma_2.prisma.paymentType.findUnique({
        where: { name: payload.name },
    });
    if (existingPaymentType) {
        throw new AppError_1.AppError(400, "Payment type with this name already exists");
    }
    return prisma_2.prisma.paymentType.create({
        data: payload,
    });
});
const getAllPaymentTypesService = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi");
    return prisma_2.prisma.paymentType.findMany();
});
const getPaymentTypeByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentType = yield prisma_2.prisma.paymentType.findUnique({
        where: { id },
    });
    if (!paymentType) {
        throw new AppError_1.AppError(404, "Payment type not found");
    }
    return paymentType;
});
const updatePaymentTypeService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPaymentType = yield prisma_2.prisma.paymentType.findUnique({
        where: { id },
    });
    if (!existingPaymentType) {
        throw new AppError_1.AppError(404, "Payment type not found");
    }
    return prisma_2.prisma.paymentType.update({
        where: { id },
        data: payload,
    });
});
const deletePaymentTypeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPaymentType = yield prisma_2.prisma.paymentType.findUnique({
        where: { id },
    });
    if (!existingPaymentType) {
        throw new AppError_1.AppError(404, "Payment type not found");
    }
    // Check if payment type is being used
    const paymentsCount = yield prisma_2.prisma.payment.count({
        where: { paymentTypeId: id },
    });
    if (paymentsCount > 0) {
        throw new AppError_1.AppError(400, "Cannot delete payment type that has associated payments");
    }
    return prisma_2.prisma.paymentType.delete({
        where: { id },
    });
});
exports.paymentService = {
    initiatePaymentInDb,
    paymentSuccessInDb,
    paymentFailInDb,
    paymentCancelDb,
    deletePaymentService,
    createPaymentTypeService,
    getAllPaymentTypesService,
    getPaymentTypeByIdService,
    updatePaymentTypeService,
    deletePaymentTypeService,
};
