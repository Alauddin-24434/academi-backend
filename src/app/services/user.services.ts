import bcrypt from "bcrypt";
import { AppError } from "../error/appError";
import { IRegisterUserPayload, ILoginUserPayload, IOAuthUserInfo, OAuthProvider } from "../interfaces/user.interfaces";
import prisma from "../shared/prisma-client";

const registerUserIntoDb = async (payload: IRegisterUserPayload) => {
  const isExistUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (isExistUser) {
    throw new AppError(409, "User already exists", "UserConflictError");
  }

  const hashedPassword = payload.method === OAuthProvider.CUSTOM
    ? await bcrypt.hash(payload.password, 10)
    : "";

  const newUser = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone,
      role: payload.role || "STUDENT",
      method: payload.method || OAuthProvider.CUSTOM,
    },
  });

  return newUser;
};

const loginUserFromDb = async (payload: ILoginUserPayload) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError(401, "Invalid email or password", "AuthenticationError");
  }

  if (user.method !== OAuthProvider.CUSTOM) {
    throw new AppError(401, `Please login using ${user.method.toLowerCase()}`, "OAuthLoginRequired");
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password", "AuthenticationError");
  }

  return user;
};

const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

const findOrCreateOAuthUser = async (userInfo: IOAuthUserInfo, method: OAuthProvider) => {
  console.log("Finding or creating OAuth user:", userInfo.email, "Method:", method);

  let user = await prisma.user.findUnique({
    where: { email: userInfo.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: userInfo.name,
        email: userInfo.email,
        password: "",
        phone: userInfo.phone || null,
        role: "STUDENT",
        method,
        avatar: userInfo.avatar || null,
      },
    });
  }

  return user;
};

export const userServices = {
  registerUserIntoDb,
  loginUserFromDb,
  getUserById,
  findOrCreateOAuthUser,
};
