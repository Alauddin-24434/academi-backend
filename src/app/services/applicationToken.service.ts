import { prisma } from "../shared/prisma-client";
import { IApplicationTokenPayload } from "../interfaces/applicationToken.interface";

export const createApplicationToken = async (data: IApplicationTokenPayload) => {
  return prisma.applicationToken.create({ data });
};

export const getApplicationTokenByUserId = async (userId: string) => {
  return prisma.applicationToken.findUnique({ where: { userId } });
};

export const updateApplicationToken = async (userId: string, data: Partial<IApplicationTokenPayload>) => {
  return prisma.applicationToken.update({ where: { userId }, data });
};

export const deleteApplicationToken = async (userId: string) => {
  return prisma.applicationToken.delete({ where: { userId } });
};