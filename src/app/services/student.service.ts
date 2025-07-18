import { prisma } from "../lib/prisma";
import type { CreateStudentInput, UpdateStudentInput, StudentQueryInput } from "../schemas/student.schema";
import type { PaginatedResponse } from "../interfaces";
import { generateStudentId } from "../utils/idGenerator";

// 1. Create Student
const createStudent = async (data: CreateStudentInput) => {

  const isExitUser= await prisma.student.findUnique({
    where:{userId: data.userId}
  })

  if(isExitUser){
    throw new Error("ALredy exist student")
  }
  return await prisma.student.create({data});
};



// 2. Get All Students
const getAllStudents = async (query: StudentQueryInput): Promise<PaginatedResponse<any>> => {
  const page = Number.parseInt(query.page || "1");
  const limit = Number.parseInt(query.limit || "10");
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { studentId: { contains: query.search, mode: "insensitive" } },
      { parentName: { contains: query.search, mode: "insensitive" } },
    ];
  }

  if (query.grade) {
    where.grade = query.grade;
  }

  if (query.status) {
    where.status = query.status;
  }

  const orderBy: any = {};
  if (query.sortBy) {
    orderBy[query.sortBy] = query.sortOrder || "asc";
  } else {
    orderBy.createdAt = "desc";
  }

  const [students, total] = await Promise.all([
    prisma.student.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        payments: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            payments: true,
            schedules: true,
          },
        },
      },
    }),
    prisma.student.count({ where }),
  ]);

  return {
    data: students,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  };
};

// 3. Get Student By ID
const getStudentById = async (id: string) => {
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      payments: {
        orderBy: { createdAt: "desc" },
      },
      schedules: {
        orderBy: { date: "asc" },
      },
      comments: {
       
      },
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};

// 4. Update Student
const updateStudent = async (id: string, data: UpdateStudentInput) => {
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) {
    throw new Error("Student not found");
  }

  return await prisma.student.update({
    where: { id },
    data,
    include: {
      payments: true,
      schedules: true,
    },
  });
};


 const activateStudent = async (id: string) => {
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) throw new Error("Student not found");

  let newStudentId = student.studentId;
  if (!newStudentId) {
    newStudentId = await generateStudentId(student.degree, student.session);
  }

  return await prisma.student.update({
    where: { id },
    data: {
      status: "ACTIVE",
      studentId: newStudentId,
    },
  });
};


// 5. Delete Student
const deleteStudent = async (id: string) => {
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) {
    throw new Error("Student not found");
  }

  await prisma.student.delete({ where: { id } });
  return { message: "Student deleted successfully" };
};

// 6. Student Stats
const getStudentStats = async () => {
  const [total, active, graduated, suspended] = await Promise.all([
    prisma.student.count(),
    prisma.student.count({ where: { status: "ACTIVE" } }),
    prisma.student.count({ where: { status: "GRADUATED" } }),
    prisma.student.count({ where: { status: "SUSPENDED" } }),
  ]);

  return {
    total,
    active,
    graduated,
    suspended,
  };
};

// ✅ Final Export Object
export const studentService = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentStats,
  activateStudent
};
