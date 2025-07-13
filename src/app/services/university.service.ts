import { IUniversityCreatePayload } from "../interfaces/university.interface";
import prisma from "../shared/prisma-client";
import redisClient from "./ioredis.clint";

export const createUniversity = async (payload: IUniversityCreatePayload) => {
  return prisma.university.create({ data: payload });
};

export const getUniversityById = async (id: string) => {
  const cached = await redisClient.get(`university:${id}`);
  if (cached) {
    return JSON.parse(cached);
  }

  const university = await prisma.university.findUnique({ where: { id } });

  if (university) {
    await redisClient.set(`university:${id}`, JSON.stringify(university), 'EX', 600);
  }

  return university;
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
