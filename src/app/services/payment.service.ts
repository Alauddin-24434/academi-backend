import { prisma } from "../shared/prisma-client";
import { IPaymentCreatePayload } from "../interfaces/payment.interface";

export const createPayment = async (data: IPaymentCreatePayload) => {
  return prisma.payment.create({ data });
};

export const getPaymentById = async (id: string) => {
  return prisma.payment.findUnique({ where: { id } });
};

export const getAllPayments = async () => {
  return prisma.payment.findMany();
};

export const updatePayment = async (id: string, data: Partial<IPaymentCreatePayload>) => {
  return prisma.payment.update({ where: { id }, data });
};

export const deletePayment = async (id: string) => {
  return prisma.payment.delete({ where: { id } });
};
