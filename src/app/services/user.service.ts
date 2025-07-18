import type { CreateUserInput, UpdateUserInput } from "../schemas/user.schema";
import type { PaginationQuery, PaginatedResponse } from "../interfaces";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
// 1. Create User
const createUser = async (data: CreateUserInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashPassword = await bcrypt.hash(data.password, 10);
  const payload = {
    ...data,
    password: hashPassword,
  }

  return await prisma.user.create({
    data: payload,
    select: {
      id: true,
      password: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      role: true,
      createdAt: true,
    },
  });
};

const loginUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Invalid email or password");

  return user;
};

// 2. Get All Users
const getAllUsers = async (query: PaginationQuery): Promise<PaginatedResponse<any>> => {
  const page = Number.parseInt(query.page || "1");
  const limit = Number.parseInt(query.limit || "10");
  const skip = (page - 1) * limit;

  const where = query.search
    ? {
      OR: [
        { name: { contains: query.search, mode: "insensitive" as const } },
        { email: { contains: query.search, mode: "insensitive" as const } },
      ],
    }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        city: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  };
};

// 3. Get User By ID
const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      role: true,
      avatar: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// 4. Update User
const updateUser = async (id: string, data: UpdateUserInput) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      role: true,
      avatar: true,
      updatedAt: true,
    },
  });
};

// 5. Delete User
const deleteUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.delete({ where: { id } });
  return { message: "User deleted successfully" };
};

// 6. Update Avatar
const updateAvatar = async (id: string, avatarUrl: string) => {
  return await prisma.user.update({
    where: { id },
    data: { avatar: avatarUrl },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
    },
  });
};

// ✅ Final Export Object
export const userService = {
  createUser,
  loginUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateAvatar,
};
