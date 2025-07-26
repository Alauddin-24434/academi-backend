
import { AppError } from "../../error/AppError";
import { initiatePayment } from "../../integrations/aamarpay/initiate.payment";
import { prisma } from "../../lib/prisma";
import { verifyPayment } from "../../integrations/aamarpay/verify.payment";
import { IPayment } from "./payment.interface";
//============================ Initiate Payment in Database ==============================//
// Finds student by ID, creates a pending payment record, then calls external payment gateway.
const initiatePaymentInDb = async (paymentData: IPayment) => {
  const { amount, paymentDate, studentId, transactionId } = paymentData;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Find student with user details
      const user = await tx.user.findFirst({
        where: { studentId: studentId },
        include: { student: true }

      });
      if (!user) throw new Error("User not found");

      // 2. Create payment record with status PENDING
      const payment = await tx.payment.create({
        data: {
          amount,
          paymentDate: new Date(paymentDate),
          transactionId,
          status: "PENDING",
          studentId,
        },
      });

      // 3. Call external payment gateway to initiate payment
      const paymentInitiateResult = await initiatePayment({
        name: user.fullName,
        email: user.email,
        phone: user?.student?.phone as string,
        amount,
        transactionId,
      });
      console.log("paymentResult", paymentInitiateResult);

      return { payment, paymentInitiateResult };
    });

    return result;
  } catch (error) {
    console.error("❌ Payment transaction failed:", error);
    throw new Error("Payment initiation failed");
  }
};

//============================ Payment Success Handling ==============================//
// Verifies payment status externally and updates payment record to COMPLETE or FAILED.
const paymentSuccessInDb = async (transactionId: string) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Verify payment status with external gateway 
    const verificationResult = await verifyPayment(transactionId);
    if (!verificationResult) throw new AppError("Payment verification failed", 400);

    // 2. Find payment record by transactionId 
    const payment = await tx.payment.findUnique({ where: { transactionId } });
    if (!payment) throw new AppError("Payment record not found", 404);

    // 3. Determine new payment status 

    if (verificationResult.pay_status === "Successful") {

      // ✅ 3.1 Approve student if payment successful
      if (payment.studentId) {
        const student = await tx.student.findUnique({ where: { id: payment.studentId } });
        if (!student) throw new AppError("Student not found", 404);

        await tx.student.update({
          where: { id: payment.studentId },
          data: { status: "APPROVE" },
        });
      }
    }



    // 4. Update payment status in DB
    await tx.payment.update({
      where: { id: payment.id },
      data: { status: "COMPLETE" },
    });

    // 5. Return the transactionId as confirmation
    return transactionId;
  });
};


//============================ Payment Failure Handling ==============================//
// Verifies failed payment and updates the payment record accordingly.
const paymentFailInDb = async (transactionId: string) => {
  return await prisma.$transaction(async (tx) => {
    const verificationResult = await verifyPayment(transactionId);
    console.log(verificationResult);
    if (!verificationResult) throw new AppError("Payment verification failed", 400);

    const payment = await tx.payment.findUnique({ where: { transactionId } });
    if (!payment) throw new AppError("Payment record not found", 404);

    // Always mark as FAILED here

    await tx.payment.update({
      where: { id: payment.id },
      data: { status: "FAILED" },
    });

    return transactionId;
  });
};

//============================ Payment Cancellation Handling ==============================//
// Updates payment status to CANCELED when user cancels the payment.
const paymentCancelDb = async (transactionId: string) => {
  return await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findUnique({ where: { transactionId } });
    if (!payment) throw new AppError("Payment record not found", 404);

    await tx.payment.update({
      where: { id: payment.id },
      data: { status: "CANCELED" },
    });

    return transactionId;
  });
};

//============================ Get Payment By ID ==============================//
// Retrieves a single payment by its unique ID.
const getPaymentById = async (id: string) => {
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw new AppError("Payment not found", 404);
  return payment;
};

//============================ Get All Payments ==============================//
// Retrieves all payment records from the database.
const getAllPayments = async () => {
  return prisma.payment.findMany();
};



//============================ Delete Payment By ID ==============================//
// Deletes a payment record by ID.
const deletePaymentById = async (id: string) => {
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw new AppError("Payment not found", 404);

  return prisma.payment.delete({ where: { id } });
};

export const paymentService = {
  initiatePaymentInDb,
  getPaymentById,
  getAllPayments,
  deletePaymentById,
  paymentSuccessInDb,
  paymentFailInDb,
  paymentCancelDb,
};
