import bcrypt from "bcrypt";
import { AppError } from "../error/appError";
import { IRegisterUserPayload, ILoginUserPayload } from "../interfaces/user.interfaces";
import prisma from "../shared/prisma-client";

const registerUserIntoDb = async (payload: IRegisterUserPayload) => {
  const isExistUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (isExistUser) {
    throw new AppError(409, "User already exists");
  }

  // Password hash
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // Create new user
  const newUser = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone,
      role: payload.role || "STUDENT",
    },
  });

  return newUser;
};

const loginUserFromDb = async (payload: ILoginUserPayload) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  // Password check
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password");
  }

  return user;
};

const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const userServices = {
  registerUserIntoDb,
  loginUserFromDb,
  getUserById,
};
