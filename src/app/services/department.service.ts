import { IDepartmentCreatePayload } from "../interfaces/department.interface";
import { prisma } from "../shared/prisma-client";

export const createDepartment = async (data: IDepartmentCreatePayload) => {
  return prisma.department.create({ data });
};

export const getDepartmentById = async (id: string) => {
  return prisma.department.findUnique({ where: { id } });
};

export const getAllDepartments = async () => {
  return prisma.department.findMany();
};

export const updateDepartment = async (id: string, data: Partial<IDepartmentCreatePayload>) => {
  return prisma.department.update({ where: { id }, data });
};

export const deleteDepartment = async (id: string) => {
  return prisma.department.delete({ where: { id } });
};