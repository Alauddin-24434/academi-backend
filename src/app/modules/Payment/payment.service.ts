import { PaymentStatus, StudentStatus } from "../../../../generated/prisma";
import { AppError } from "../../error/AppError"
import { prisma } from "../../lib/prisma"
import { initiatePayment } from "../../paymentIntegration/initiate.payment";
import { verifyPayment } from "../../paymentIntegration/verifyPayment";
import type {
  ICreatePaymentInput,
  IPayment,
  IPaymentType,
  IUpdatePaymentInput,

} from "./payment.interface"

//============================ Initiate Payment in Database ==============================//
// Finds student by ID, creates a pending payment record, then calls external payment gateway.
const initiatePaymentInDb = async (paymentData: ICreatePaymentInput) => {
  const { amount, paymentDate, userId, transactionId, paymentTypeId, } = paymentData;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Find student with user details
      const user = await tx.user.findFirst({
        where: { id: userId },
        include: { student: true }

      });
      if (!user) throw new Error("User not found");

      // 2. Create payment record with status PENDING
      const pay = await tx.payment.create({
        data: {
          amount,
          paymentDate,
          transactionId,
          paymentTypeId,
          userId,
          status: "PENDING",

        },
      });
      console.log(pay)
      // 3. Call external payment gateway to initiate payment
      const paymentInitiateResult = await initiatePayment({
        name: user.name,
        email: user.email,
        phone: user.phone,
        amount,
        transactionId: transactionId,
      });

      return paymentInitiateResult
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
    if (!verificationResult) throw new AppError(400, "Payment verification failed");

    // 2. Find payment record by transactionId 
    const payment = await tx.payment.findUnique({ where: { transactionId } });
    if (!payment) throw new AppError(404, "Payment record not found");

    // 3. If successful, approve student
    if (verificationResult.pay_status === "Successful") {
      const student = await tx.student.findUnique({ where: { userId: payment.userId } });
      if (!student) throw new AppError(404, "Student not found");

      await tx.student.update({
        where: { id: student.id }, // ✅ Corrected line
        data: { status: StudentStatus.APPROVED },
      });
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
    if (!verificationResult) throw new AppError(400, "Payment verification failed");

    const payment = await tx.payment.findUnique({ where: { transactionId } });
    if (!payment) throw new AppError(404, "Payment record not found",);

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
    if (!payment) throw new AppError(404, "Payment record not found");

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
  if (!payment) throw new AppError(404, "Payment not found");
  return payment;
};

//============================ Get All Payments ==============================//
// Retrieves all payment records from the database.
const getAllPayments = async () => {
  return prisma.payment.findMany();
};



const deletePaymentService = async (id: string) => {
  const existingPayment = await prisma.payment.findUnique({
    where: { id },
  })

  if (!existingPayment) {
    throw new AppError(404, "Payment not found")
  }

  return prisma.payment.delete({
    where: { id },
  })
}

// Payment Type Services
const createPaymentTypeService = async (payload: IPaymentType) => {
  // Check if payment type name already exists
  const existingPaymentType = await prisma.paymentType.findUnique({
    where: { name: payload.name },
  })

  if (existingPaymentType) {
    throw new AppError(400, "Payment type with this name already exists")
  }

  return prisma.paymentType.create({
    data: payload,
  })
}

const getAllPaymentTypesService = async () => {
  console.log("hi")
  return prisma.paymentType.findMany()
}

const getPaymentTypeByIdService = async (id: string) => {
  const paymentType = await prisma.paymentType.findUnique({
    where: { id },


  })

  if (!paymentType) {
    throw new AppError(404, "Payment type not found")
  }

  return paymentType
}

const updatePaymentTypeService = async (id: string, payload: IPaymentType) => {
  const existingPaymentType = await prisma.paymentType.findUnique({
    where: { id },
  })

  if (!existingPaymentType) {
    throw new AppError(404, "Payment type not found")
  }

  return prisma.paymentType.update({
    where: { id },
    data: payload,
  })
}

const deletePaymentTypeService = async (id: string) => {
  const existingPaymentType = await prisma.paymentType.findUnique({
    where: { id },
  })

  if (!existingPaymentType) {
    throw new AppError(404, "Payment type not found")
  }

  // Check if payment type is being used
  const paymentsCount = await prisma.payment.count({
    where: { paymentTypeId: id },
  })

  if (paymentsCount > 0) {
    throw new AppError(400, "Cannot delete payment type that has associated payments")
  }

  return prisma.paymentType.delete({
    where: { id },
  })
}

export const paymentService = {
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
}
