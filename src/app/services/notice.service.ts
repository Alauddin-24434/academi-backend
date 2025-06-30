import { INoticeCreatePayload } from "../interfaces/notice.interface";
import { prisma } from "../shared/prisma-client";

export const createNotice = async (data: INoticeCreatePayload) => {
  return prisma.notice.create({ data });
};

export const getNoticeById = async (id: string) => {
  return prisma.notice.findUnique({ where: { id } });
};

export const getAllNotices = async () => {
  return prisma.notice.findMany();
};

export const updateNotice = async (id: string, data: Partial<INoticeCreatePayload>) => {
  return prisma.notice.update({ where: { id }, data });
};

export const deleteNotice = async (id: string) => {
  return prisma.notice.delete({ where: { id } });
};
