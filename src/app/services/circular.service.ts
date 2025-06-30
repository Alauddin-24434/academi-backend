import { prisma } from "../shared/prisma-client";
import { ICircularCreatePayload } from "../interfaces/circular.interface";

export const createCircular = async (data: ICircularCreatePayload) => {
  return prisma.circular.create({ data });
};

export const getCircularById = async (id: string) => {
  return prisma.circular.findUnique({ where: { id } });
};

export const getAllCirculars = async () => {
  return prisma.circular.findMany();
};

export const updateCircular = async (id: string, data: Partial<ICircularCreatePayload>) => {
  return prisma.circular.update({ where: { id }, data });
};

export const deleteCircular = async (id: string) => {
  return prisma.circular.delete({ where: { id } });
};
