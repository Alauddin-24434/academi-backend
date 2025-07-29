import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { IFaculty } from "./faculty.interface";

const createFaculty = async (data: IFaculty) => {
  const exists = await prisma.faculty.findUnique({ where: { name: data.name, code: data.code } });
  if (exists) throw new AppError(400, "Faculty already exists");

  return prisma.faculty.create({ data });
};

const getFacultyById = async (id: string) => {
  const faculty = await prisma.faculty.findUnique({ where: { id }, include: { departments: true } });
  if (!faculty) throw new AppError(404, "Faculty not found");
  return faculty;
};

const getAllFaculties = async () => {
  return prisma.faculty.findMany({ include: { departments: true } });
};

const updateFacultyById = async (id: string, data: any) => {
  const faculty = await prisma.faculty.findUnique({ where: { id } });
  if (!faculty) throw new AppError(404, "Faculty not found",);

  return prisma.faculty.update({ where: { id }, data });
};

const deleteFacultyById = async (id: string) => {
  const faculty = await prisma.faculty.findUnique({ where: { id } });
  if (!faculty) throw new AppError(404, "Faculty not found",);

  return prisma.faculty.delete({ where: { id } });
};

export const facultyService = {
  createFaculty,
  getFacultyById,
  getAllFaculties,
  updateFacultyById,
  deleteFacultyById,
};
