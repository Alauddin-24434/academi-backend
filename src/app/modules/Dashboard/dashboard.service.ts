
import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { IUser } from "../User/user.interfcae";

export const getDashboardOverview = async (user: IUser) => {
  if (user.role === "ADMIN") {
    // Admin: System-wide stats
    const totalStudents = await prisma.student.count();
    const approvedStudents = await prisma.student.count({
      where: { status: "APPROVE" },
    });
    const pendingStudents = await prisma.student.count({
      where: { status: "PENDING" },
    });
    const suspendedStudents = await prisma.student.count({
      where: { status: "SUSPENDED" },
    });

    const totalFaculties = await prisma.faculty.count();
    const totalDepartments = await prisma.department.count();

    const totalPaymentsAmount = await prisma.payment.aggregate({
      _sum: { amount: true },
    });

    const completedPayments = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "COMPLETE" },
    });

    const pendingPayments = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "PENDING" },
    });

    return {
      role: "ADMIN",
      totalStudents,
      approvedStudents,
      pendingStudents,
      suspendedStudents,
      totalFaculties,
      totalDepartments,
      totalPayments: totalPaymentsAmount._sum.amount || 0,
      completedPayments: completedPayments._sum.amount || 0,
      pendingPayments: pendingPayments._sum.amount || 0,
    };
  }

  // Student: Personal dashboard
  if (user.role === "STUDENT") {
    const isExistUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        student: {
          include: {
            session: true,
            department: { include: { faculty: true } },
            payments: true,
          },
        },
      },
    });

    if (!isExistUser?.student) {
      throw new AppError("Student not found", 404);
    }

    const completed = isExistUser.student.payments?.filter(
      (p) => p.status === "COMPLETE"
    ) ?? [];

    return {
      role: "STUDENT",
      fullName: isExistUser.student.fullName,
      status: isExistUser.student.status,
      session: isExistUser.student.session.name,
      department: isExistUser.student.department.name,
      faculty: isExistUser.student.department.faculty.name,

      totalPaid: completed.reduce((sum, p) => sum + p.amount, 0),

      paymentLists: isExistUser.student.payments?.filter(
        (p) =>
          p.status === "COMPLETE" ||
          p.status === "CANCELED" ||
          p.status === "FAILED"
      ) ?? [],
    };
  }

  throw new AppError("Unauthorized role", 403);
};
