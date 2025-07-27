import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { IStudent } from "./student.interface";
import bcrypt from "bcryptjs"

// =================================================================create student aand signup====================================================
const createStudent = async (data: IStudent) => {
  const {
    address,
    fatherName,
    fullName,
    motherName,
    gender,
    sessionId,
    departmentId,
    dateOfBirth,
    phone,
    passportPhoto,
    password,
    email,
  } = data;

  return await prisma.$transaction(async (tx) => {
    // 1. Check if session exists
    const session = await tx.academicSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new AppError("Session not found", 404);

    // 2. Check if student with same fullName, fatherName, and motherName already exists
    const existingStudent = await tx.student.findFirst({
      where: {
        fullName,
        fatherName,
        motherName,
      },
    });
    if (existingStudent) throw new AppError("Student already exists", 409);

    // 3. Check if email already exists
    const existingUser = await tx.user.findUnique({
      where: { email },
    });
    if (existingUser) throw new AppError("Email already exists", 409);

    const hashPassword = await bcrypt.hash(password, 10);

    // 5. Create student
    const student = await tx.student.create({
      data: {
      
        fullName,
        fatherName,
        motherName,
        address,
        gender,
        sessionId,
        departmentId,
        dateOfBirth,
        phone,
        passportPhoto,
      },
    });



    // 6. Create user
    const user = await tx.user.create({
      data: {
        email,
        password: hashPassword,
        fullName,
        pasportPhoto: passportPhoto,
        studentId: student.id,
        role: "STUDENT",
      },
    });

    return { student, user };
  });
};


// ==========================================================get student byId=============================================
const getStudentById = async (id: string) => {
  const student = await prisma.student.findUnique({
    where: { id },
    include: {

      department: {
        include: {
          faculty: true
        }
      }
    }
  });
  if (!student) throw new AppError("Student not found", 404);
  return student;
};

// =============================================get StudentBy userID=============================================
const getStudentsByUserId = async (userId: string) => {
  const userWithStudent = await prisma.student.findUnique({
    where: { id: userId },

  });

  if (!userWithStudent) {
    throw new AppError("Student not found");
  }

  return userWithStudent;
};


// ===========================================Get All students============================================

const getAllStudents = async () => {
  return prisma.student.findMany({
    include: {
      department: {
        include: {
          faculty: true
        }
      }
    }
  });
};

// ============================================update Students===============================================
const updateStudentById = async (id: string, data: any) => {
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) throw new AppError("Student not found", 404);

  return prisma.student.update({
    where: { id },
    data,
  });
};


// ===============export StydentService==========================

export const studentService = {
  createStudent,
  getStudentById,
  getAllStudents,
  updateStudentById,
  getStudentsByUserId,

};
