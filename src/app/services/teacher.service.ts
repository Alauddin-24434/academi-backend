import { prisma } from "../lib/prisma"
import type { CreateTeacherInput, UpdateTeacherInput, CreateEducationInput } from "../schemas/teacher.schema"
import type { PaginationQuery, PaginatedResponse } from "../interfaces"

export class TeacherService {
  async createTeacher(data: CreateTeacherInput) {
    const existingTeacher = await prisma.teacher.findUnique({
      where: { email: data.email },
    })

    if (existingTeacher) {
      throw new Error("Teacher with this email already exists")
    }

    return await prisma.teacher.create({
      data,
      include: {
        education: true,
        schedules: true,
      },
    })
  }

  async getAllTeachers(query: PaginationQuery): Promise<PaginatedResponse<any>> {
    const page = Number.parseInt(query.page || "1")
    const limit = Number.parseInt(query.limit || "10")
    const skip = (page - 1) * limit

    const where = query.search
      ? {
          OR: [
            { name: { contains: query.search, mode: "insensitive" as const } },
            { email: { contains: query.search, mode: "insensitive" as const } },
            { subject: { contains: query.search, mode: "insensitive" as const } },
          ],
        }
      : {}

    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          education: true,
          _count: {
            select: {
              schedules: true,
            },
          },
        },
      }),
      prisma.teacher.count({ where }),
    ])

    return {
      data: teachers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    }
  }

  async getTeacherById(id: string) {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        education: true,
        schedules: {
          orderBy: { date: "asc" },
        },
      },
    })

    if (!teacher) {
      throw new Error("Teacher not found")
    }

    return teacher
  }

  async updateTeacher(id: string, data: UpdateTeacherInput) {
    const teacher = await prisma.teacher.findUnique({ where: { id } })
    if (!teacher) {
      throw new Error("Teacher not found")
    }

    return await prisma.teacher.update({
      where: { id },
      data,
      include: {
        education: true,
        schedules: true,
      },
    })
  }

  async deleteTeacher(id: string) {
    const teacher = await prisma.teacher.findUnique({ where: { id } })
    if (!teacher) {
      throw new Error("Teacher not found")
    }

    await prisma.teacher.delete({ where: { id } })
    return { message: "Teacher deleted successfully" }
  }

  async addEducation(teacherId: string, data: CreateEducationInput) {
    const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } })
    if (!teacher) {
      throw new Error("Teacher not found")
    }

    return await prisma.education.create({
      data: {
        ...data,
        teacherId,
      },
    })
  }

  async getTeacherStats() {
    const [total, active, subjects] = await Promise.all([
      prisma.teacher.count(),
      prisma.teacher.count({ where: { status: "ACTIVE" } }),
      prisma.teacher.groupBy({
        by: ["subject"],
        _count: { subject: true },
      }),
    ])

    return {
      total,
      active,
      subjects: subjects.map((s) => ({ subject: s.subject, count: s._count.subject })),
    }
  }
}
