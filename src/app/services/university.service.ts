import { IUniversityCreatePayload } from "../interfaces/university.interface";
import { prisma } from "../shared/prisma-client";

export const createUniversity = async (payload: IUniversityCreatePayload) => {
  return prisma.university.create({ data: payload });
};

export const getUniversityById = async (id: string) => {
  return prisma.university.findUnique({ where: { id } });
};

export const getAllUniversities = async () => {
  return prisma.university.findMany();
};

export const updateUniversity = async (id: string, payload: Partial<IUniversityCreatePayload>) => {
  return prisma.university.update({ where: { id }, data: payload });
};

export const deleteUniversity = async (id: string) => {
  return prisma.university.delete({ where: { id } });
};
