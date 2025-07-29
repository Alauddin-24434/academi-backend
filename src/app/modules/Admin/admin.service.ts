import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { IAdmin } from "./admin.interface";

export const createAdminService = async (payload: IAdmin) => {
  // Step 0: Check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!existingUser) {
    throw new AppError(404, "User not found");
  }

  const alreadyExist= await prisma.admin.findFirst({
    where: {userId: payload.userId}
  })

  
  if (alreadyExist) {
    throw new AppError(400, "Admin is already Exist");
  }

  // Step 1 & 2: Update user role and create admin profile in a transaction
  const admin = await prisma.$transaction([
    prisma.user.update({
      where: { id: payload.userId },
      data: { role: "ADMIN" },
    }),

    prisma.admin.create({
      data: {
        userId: payload.userId,
        permissions: payload.permissions,
      },
      include: {
        user: true,
      },
    }),
  ]);

  return admin;
};


const getAllAdminsService = async () => {
  return prisma.admin.findMany({
    where: {
      user: {
        role: 'ADMIN',  
      },
    },
    include: {
      user: true,   
    },
  });

};

const getAdminByIdService = async (id: string) => {
  return prisma.admin.findUnique({
    where: { id },
    include: { user: true },
  });
};

// ✅ Final Export Object
export const adminService = {

  createAdminService,
  getAdminByIdService,
  getAllAdminsService

};
