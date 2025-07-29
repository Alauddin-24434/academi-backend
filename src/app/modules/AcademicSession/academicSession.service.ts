import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { IAcademicSession } from "./academicSession.interface";

export const createAcademicSession = async (payload: IAcademicSession) => {
      const exists = await prisma.academicSession.findUnique({ where: { name:payload.name } });
  if (exists) throw new AppError(400, "Session code already exists",);
  return await prisma.academicSession.create({ data: payload });
};

export const getAllAcademicSessions = async () => {
  return await prisma.academicSession.findMany();
};

export const getSingleAcademicSession = async (id: string) => {
  const result = await prisma.academicSession.findUnique({ where: { id } });

  if (!result) {
    throw new AppError(404, "Academic session not found");
  }

  return result;
};

export const updateAcademicSession = async (
  id: string,
  payload: IAcademicSession
) => {
  const isExist = await prisma.academicSession.findUnique({ where: { id } });

  if (!isExist) {
    throw new AppError(404, "Academic session not found");
  }

  return await prisma.academicSession.update({
    where: { id },
    data: payload,
  });
};

export const deleteAcademicSession = async (id: string) => {
  const isExist = await prisma.academicSession.findUnique({ where: { id } });

  if (!isExist) {
    throw new AppError(404, "Academic session not found");
  }

  return await prisma.academicSession.update({
    where: { id },
    data: { isActive: false },
  });
};

export const academicSessionService = {
  createAcademicSession,
  getAllAcademicSessions,
  getSingleAcademicSession,
  updateAcademicSession,
  deleteAcademicSession,
};
