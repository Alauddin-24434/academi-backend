import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { IDepartment } from "./department.interface";

const createDepartment = async (data: IDepartment) => {
  const exists = await prisma.department.findUnique({ where: { code: data.name } });
  if (exists) throw new AppError(400, "Department code already exists",);
  return prisma.department.create({ data });
};

const getDepartmentById = async (id: string) => {
  const department = await prisma.department.findUnique({ where: { id, isActive: true }, include: { faculty: true, students: true, } });
  if (!department) throw new AppError(404, "Department not found");
  return department;
};

const getAllDepartments = async () => {
  return prisma.department.findMany({ where: { isActive: true }, include: { faculty: true, students: true, } });
};

const updateDepartmentById = async (id: string, data: IDepartment) => {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) throw new AppError(404, "Department not found");
  return prisma.department.update({ where: { id }, data });
};

const deleteDepartmentById = async (id: string) => {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) throw new AppError(404, "Department not found");
  const softDelete = await prisma.department.update({
    where: { id },
    data: {
      isActive: false,
    },
  });

  return softDelete;
};

export const departmentService = {
  createDepartment,
  getDepartmentById,
  getAllDepartments,
  updateDepartmentById,
  deleteDepartmentById,
};
