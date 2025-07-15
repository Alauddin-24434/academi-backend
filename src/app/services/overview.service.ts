import { AppError } from "../error/appError";
import prisma from "../shared/prisma-client";




export const overview = async (userId: string, role: string) => {
    if (!userId || !role) {
        throw new AppError(400, "User ID and Role are required");
    }



    switch (role) {
        case "superadmin": {
            const totalUsers = await prisma.user.count();
            const totalUniversities = await prisma.university.count();
            const totalDepartments = await prisma.department.count();
            const totalApplications = await prisma.application.count();

            return {
                role,
                totalUsers,
                totalUniversities,
                totalDepartments,
                totalApplications,
            };
        }

        case "universityadmin": {
            const university = await prisma.university.findFirst({
                where: { id: userId },
            });

            if (!university) {
                throw new AppError(404, "University not found for this admin");
            }

            const departmentCount = await prisma.department.count({
                where: { id: university.id },
            });

            const applicationCount = await prisma.application.count({
                where: { universityId: university.id },
            });

            return {
                role,
                universityId: university.id,
                universityName: university.name,
                departmentCount,
                applicationCount,
            };
        }

        case "student": {
            const applications = await prisma.application.findMany({
                where: { userId },
                include: {
                    university: true,
                    department: true,
                },
            });

            return {
                role,
                applicationCount: applications.length,
                applications,
            };
        }

        default:
            throw new AppError(400, "Invalid role type");
    }
};



export const overviewServices={
    overview
}