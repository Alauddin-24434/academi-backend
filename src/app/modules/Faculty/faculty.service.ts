import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";

 const createFaculty = async (data: any) => {
  const exists = await prisma.faculty.findUnique({ where: { name: data.name } });
  if (exists) throw new AppError("Faculty already exists", 400);

  return prisma.faculty.create({ data });
};

 const getFacultyById = async (id: string) => {
  const faculty = await prisma.faculty.findUnique({ where: { id }, include: { departments: true } });
  if (!faculty) throw new AppError("Faculty not found", 404);
  return faculty;
};

 const getAllFaculties = async () => {
  return prisma.faculty.findMany({ include: { departments: true } });
};

 const updateFacultyById = async (id: string, data: any) => {
  const faculty = await prisma.faculty.findUnique({ where: { id } });
  if (!faculty) throw new AppError("Faculty not found", 404);

  return prisma.faculty.update({ where: { id }, data });
};

 const deleteFacultyById = async (id: string) => {
  const faculty = await prisma.faculty.findUnique({ where: { id } });
  if (!faculty) throw new AppError("Faculty not found", 404);

  return prisma.faculty.delete({ where: { id } });
};

export const facultyService={
  createFaculty,
  getFacultyById,
  getAllFaculties,
  updateFacultyById,
  deleteFacultyById,
};
