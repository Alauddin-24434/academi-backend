import { IGlobalDepartmentCreatePayload } from "../interfaces/globalDepartment.interface";
import prisma from "../shared/prisma-client";

export const createDepartment = async (payload: IGlobalDepartmentCreatePayload) => {
  // check if department with same name exists under the same university
  const isExist = await prisma.department.findFirst({
    where: {
      name: payload.name,
     
    },
  });

  if (isExist) {
    throw new Error("Department  already exist");
  }

  const data = await prisma.department.create({
    data: {
      name: payload.name,
      code: payload.code,
      category: payload.category,
   
    },
  });

  return data;
};



export const getDepartmentById = async (id: string) => {
  return prisma.department.findUnique({ where: { id } });
};

export const getAllDepartments = async () => {
  return prisma.department.findMany();
};

export const updateDepartment = async (id: string, data: Partial<IGlobalDepartmentCreatePayload>) => {
  return prisma.department.update({ where: { id }, data });
};

export const deleteDepartment = async (id: string) => {
  return prisma.department.delete({ where: { id } });
};