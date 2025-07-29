import { AppError } from "../../error/AppError"
import { prisma } from "../../lib/prisma"
import type { ICreateStudentInput, IUpdateStudentInput } from "./student.interface"

const createStudentService = async (payload: ICreateStudentInput) => {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id: payload.userId },
  })
  if (!existingUser) {
    throw new AppError(404, "User not found")
  }



  const result = await prisma.$transaction([
    prisma.user.update({
      where: { id: payload.userId },
      data: { role: "STUDENT" },
    }),
    prisma.student.create({
      data: {
        userId: payload.userId,
        passportPhoto: payload.passportPhoto,
        sessionId: payload.sessionId,
        fullName: payload.fullName,
        fatherName: payload.fatherName,
        motherName: payload.motherName,
        departmentId: payload.departmentId

      }
      ,
      include: {
        user: true,
      },
    }),
  ])

  return result[1]
}

const getAllStudentsService = async () => {
  return prisma.student.findMany({
    include: {
      user: true,
      statusHistory: {
        orderBy: { changedAt: "desc" },
        take: 1,
      },
    },
  })
}

const getStudentByIdService = async (id: string) => {
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      user: true,
      statusHistory: {
        orderBy: { changedAt: "desc" },
      },

    },
  })

  if (!student) {
    throw new AppError(404, "Student not found")
  }

  return student
}

const updateStudentService = async (id: string, payload: IUpdateStudentInput) => {
  const existingStudent = await prisma.student.findUnique({
    where: { id },
  })

  if (!existingStudent) {
    throw new AppError(404, "Student not found")
  }

  return prisma.student.update({
    where: { id },
    data: payload,
    include: {
      user: true,
    },
  })
}

const updateStudentStatusService = async (id: string, status: string, reason?: string, changedBy?: string) => {
  const student = await prisma.student.findUnique({
    where: { id },
  })

  if (!student) {
    throw new AppError(404, "Student not found")
  }

  const result = await prisma.$transaction([
    prisma.student.update({
      where: { id },
      data: { status: status as any },
    }),
    prisma.studentStatusHistory.create({
      data: {
        studentId: id,
        fromStatus: student.status,
        toStatus: status as any,
        reason,
        changedBy,
      },
    }),
  ])

  return result[0]
}

const deleteStudentService = async (id: string) => {
  const existingStudent = await prisma.student.findUnique({
    where: { id },
  })

  if (!existingStudent) {
    throw new AppError(404, "Student not found")
  }

  return prisma.student.delete({
    where: { id },
  })
}

export const studentService = {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  updateStudentStatusService,
  deleteStudentService,
}
