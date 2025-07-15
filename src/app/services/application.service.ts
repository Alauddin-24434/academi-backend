
import { AppError } from "../error/appError";
import { IApplicationCreatePayload } from "../interfaces/application.interface";
import prisma from "../shared/prisma-client";

export const createApplication = async (data: IApplicationCreatePayload) => {
  const currentYear = new Date().getFullYear();

  const uniqueUniversityIds = Array.from(new Set(data.universityId));
  const uniqueDepartmentIds = Array.from(new Set(data.departmentId));

  const user = await prisma.user.findUnique({ where: { id: data.userId } });
  if (!user) throw new AppError(404, `User with ID ${data.userId} not found`, "UserNotFound");

  const validUniversityIds = await prisma.university.findMany({
    where: { id: { in: uniqueUniversityIds } },
    select: { id: true },
  });

  const validDepartmentIds = await prisma.department.findMany({
    where: { id: { in: uniqueDepartmentIds } },
    select: { id: true },
  });

  if (validUniversityIds.length !== uniqueUniversityIds.length) {
    throw new AppError(404, "Some university IDs are invalid", "InvalidUniversity");
  }

  if (validDepartmentIds.length !== uniqueDepartmentIds.length) {
    throw new AppError(404, "Some department IDs are invalid", "InvalidDepartment");
  }

  const applicationsToCreate = [];

  for (const university of validUniversityIds) {
    for (const department of validDepartmentIds) {
      // ✅ Check if application already exists for same user, university, department, round
      const existingApp = await prisma.application.findFirst({
        where: {
          userId: data.userId,
          universityId: university.id,
          departmentId: department.id,
          round: data.round ?? 1,
        },
      });

      if (!existingApp) {
        applicationsToCreate.push({
          user: { connect: { id: data.userId } },
          university: { connect: { id: university.id } },
          department: { connect: { id: department.id } },
          category: data.category,
          status: data.status ?? "PENDING",
          round: data.round ?? 1,
          boardName: data.boardName,
          registrationNo: data.registrationNo,
          rollNo: data.rollNo,
          year: currentYear,
        });
      }
    }
  }

  // If no new applications to create
  if (applicationsToCreate.length === 0) {
    throw new AppError(409, "Applications already exist for the selected round and options", "DuplicateApplication");
  }

  const createdApplications = await Promise.all(
    applicationsToCreate.map(appData => prisma.application.create({ data: appData }))
  );

  return createdApplications;
};



  export const getApplicationById = async (id: string) => {
    return prisma.application.findUnique({ where: { id } });
  };

  export const getAllApplications = async () => {
    return prisma.application.findMany();
  };

  export const updateApplication = async (id: string, data: Partial<IApplicationCreatePayload>) => {
    // return prisma.application.update({
    //   where: { id },
    //   data,
    // });
  };

  export const deleteApplication = async (id: string) => {
    return prisma.application.delete({ where: { id } });
  };
