


import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

import { AppError } from "../../error/AppError";
import { ILogin } from "./user.interfcae";
// 1. Create User
const createUser = async (data: any) => {
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
      email: true,
      role: true,
      createdAt: true,
    },
  });
};


export const loginUserByEmail = async (body: ILogin) => {
  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // যদি user না মিলে
  if (!user) {
    throw new AppError("Invalid email or password", 400);
    // অথবা: throw new Error("Invalid email or password");
  }

  // পাসওয়ার্ড মিল আছে কি না চেক
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError("Invalid email or password", 400);
    // অথবা: throw new Error("Invalid email or password");
  }

  // পাসওয়ার্ড ও ইউজার ঠিক থাকলে রিটার্ন
  return user;
};



// 2. Get All Users
const getAllUsers = async (query:any) => {
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
      include: { student: true },
      take: limit,
      orderBy: { createdAt: "desc" },
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
    include: { student: {include:{department:{include:{faculty:true}}}}  }
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// 4. Update User
const updateUser = async (id: string, data: any) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,

      email: true,
      role: true,

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



// ✅ Final Export Object
export const userService = {
  createUser,
  loginUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,

};
