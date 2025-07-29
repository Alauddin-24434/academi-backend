import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { ICreateStaffInput, IUpdateStaffInput } from "./staff.interface";

const createStaffService = async (payload: ICreateStaffInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: payload.userId },
  });
  if (!existingUser) {
    throw new AppError(404, "User not found");
  }

  const result = await prisma.$transaction([
    prisma.user.update({
      where: { id: payload.userId },
      data: { role: "STAFF" },
    }),
    prisma.staff.create({
      data: {
        ...payload,
        joinedDate: payload.joinedDate ? new Date(payload.joinedDate) : new Date(),
      },
      include: {
        user: true,
        stats: true,
        socialLinks: true,
      },
    }),
  ]);

  return result[1];
};

const getAllStaffService = async () => {
  return prisma.staff.findMany({
    include: {
      user: true,
      stats: {
        orderBy: { order: 'asc' },
      },
      socialLinks: {
        where: { isActive: true },
      },
    },
    orderBy: [
      { isFeatured: 'desc' },
      { displayOrder: 'asc' },
      { name: 'asc' },
    ],
  });
};

const getStaffByIdService = async (id: string) => {
  const staff = await prisma.staff.findUnique({
    where: { id },
    include: {
      user: true,
      stats: {
        orderBy: { order: 'asc' },
      },
      socialLinks: {
        where: { isActive: true },
      },
    },
  });

  if (!staff) {
    throw new AppError(404, "Staff member not found");
  }

  return staff;
};

const updateStaffService = async (id: string, payload: IUpdateStaffInput) => {
  const existingStaff = await prisma.staff.findUnique({
    where: { id },
  });

  if (!existingStaff) {
    throw new AppError(404, "Staff member not found");
  }

  return prisma.staff.update({
    where: { id },
    data: payload,
    include: {
      user: true,
      stats: true,
      socialLinks: true,
    },
  });
};

const deleteStaffService = async (id: string) => {
  const existingStaff = await prisma.staff.findUnique({
    where: { id },
  });

  if (!existingStaff) {
    throw new AppError(404, "Staff member not found");
  }

  return prisma.staff.delete({
    where: { id },
  });
};

export const staffService = {
  createStaffService,
  getAllStaffService,
  getStaffByIdService,
  updateStaffService,
  deleteStaffService,
};
