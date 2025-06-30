// src/services/application.service.ts
import { prisma } from "../shared/prisma-client";
import { IApplicationCreatePayload } from "../interfaces/application.interface";

export const createApplication = async (data: IApplicationCreatePayload) => {
  return prisma.application.create({ data });
};

export const getApplicationById = async (id: string) => {
  return prisma.application.findUnique({ where: { id } });
};

export const getAllApplications = async () => {
  return prisma.application.findMany();
};

export const updateApplication = async (id: string, data: Partial<IApplicationCreatePayload>) => {
  return prisma.application.update({
    where: { id },
    data,
  });
};

export const deleteApplication = async (id: string) => {
  return prisma.application.delete({ where: { id } });
};
