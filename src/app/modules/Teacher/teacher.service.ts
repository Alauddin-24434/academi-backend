import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { ITeacher } from "./teacher.interface"; 
import bcrypt from "bcryptjs";

// ====================================================
// Create Teacher (Signup)
// ====================================================
const createTeacher = async (data: ITeacher) => {
    const {
        fullName,
        fatherName,
        motherName,
        phone,
        passportPhoto,
        gender,
        dateOfBirth,
        departmentId,
        teachingSubjectTitle,
        teachingDescription,
        email,
        password,
    } = data;

    return await prisma.$transaction(async (tx) => {
        // 1. Check if department exists
        const department = await tx.department.findUnique({
            where: { id: departmentId },
        });
        if (!department) throw new AppError("Department not found", 404);

        // 2. Check if teacher with same fullName, fatherName, motherName already exists
        const existingTeacher = await tx.teacher.findFirst({
            where: {
                fullName,
                fatherName,
                motherName,
            },
        });
        if (existingTeacher) throw new AppError("Teacher already exists", 409);

        // 3. Check if email already exists
        const existingUser = await tx.user.findUnique({
            where: { email },
        });
        if (existingUser) throw new AppError("Email already exists", 409);

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create teacher
        const teacher = await tx.teacher.create({
            data: {
                fullName,
                fatherName,
                motherName,
                phone,
                passportPhoto,
                gender,
                dateOfBirth,
                departmentId,
                teachingSubjectTitle,
                teachingDescription,
            },
        });

        // 6. Create user for the teacher
        const user = await tx.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName,
                pasportPhoto: passportPhoto,
                teacherId: teacher.id,
                role: "TEACHER"
            },
        });

        return { teacher, user };
    });
};

// ====================================================
// Get Teacher By ID
// ====================================================
const getTeacherById = async (id: string) => {
    const teacher = await prisma.teacher.findUnique({
        where: { id }
    });
    if (!teacher) throw new AppError("Teacher not found", 404);
    return teacher;
};

// ====================================================
// Get All Teachers
// ====================================================
const getAllTeachers = async () => {
    return prisma.teacher.findMany();
};

// ====================================================
// Update Teacher By ID
// ====================================================
const updateTeacherById = async (id: string, data: Partial<ITeacher>) => {
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new AppError("Teacher not found", 404);

    return prisma.teacher.update({
        where: { id },
        data,
    });
};

// ====================================================
// Export teacherService
// ====================================================
export const teacherService = {
    createTeacher,
    getTeacherById,
    getAllTeachers,
    updateTeacherById,
};
