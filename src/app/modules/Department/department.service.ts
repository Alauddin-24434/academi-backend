import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";

 const createDepartment = async (data: any) => {
  const exists = await prisma.department.findUnique({ where: { code: data.code } });
  if (exists) throw new AppError("Department code already exists", 400);
  return prisma.department.create({ data });
};

 const getDepartmentById = async (id: string) => {
  const department = await prisma.department.findUnique({ where: { id }, include: { faculty: true, students: true, } });
  if (!department) throw new AppError("Department not found", 404);
  return department;
};

 const getAllDepartments = async () => {
  return prisma.department.findMany({ include: { faculty: true, students: true,  } });
};

 const updateDepartmentById = async (id: string, data: any) => {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) throw new AppError("Department not found", 404);
  return prisma.department.update({ where: { id }, data });
};

 const deleteDepartmentById = async (id: string) => {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) throw new AppError("Department not found", 404);
  return prisma.department.delete({ where: { id } });
};

export const departmentService={
  createDepartment,
  getDepartmentById,
  getAllDepartments,
  updateDepartmentById,
  deleteDepartmentById,
};
