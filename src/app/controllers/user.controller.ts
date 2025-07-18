import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { createUserSchema, loginSchema, updateUserSchema, } from "../schemas/user.schema";
import type { ApiResponse } from "../interfaces";
import { catchAsyncHandler } from "../middleware/catchAsyncHandler";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt";
import { cookieOptions } from "../utils/cookieOptions";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
// ✅ Function-based controller


// ==================================== Register user===========================================
const registerUser = catchAsyncHandler(async (req: Request, res: Response) => {
  const validatedData = createUserSchema.parse(req.body);
  const user = await userService.createUser(validatedData);

  const payload = { id: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const response: ApiResponse = {
    success: true,
    message: "User registered successfully",
    data: { user, accessToken },
  };

  res.status(201).json(response);
});


// ================================Login user==================================================

const loginUser = catchAsyncHandler(async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);

  const user = await userService.loginUserByEmail(validatedData.email);


  const isPasswordMatched = await bcrypt.compare(validatedData.password, user.password);
  if (!isPasswordMatched) {

    throw new Error("Invalid email or password")

  }

  // success
  const payload = { id: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: "Login successful",
    data: { user, accessToken },
  });
});

// ======================================Refresh token verify and return acces token ===========================================
 const refreshAccessToken = catchAsyncHandler(async (req: Request, res: Response) => {
  const refreshTokenRaw =req.cookies?.refreshToken || (req.headers["x-refresh-token"] as string);

  if (!refreshTokenRaw) {
    return res.status(401).json({ success: false, message: "Refresh token missing" });
  }

  // ✅ Verify the refresh token
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshTokenRaw);
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid or expired refresh token" });
  }

  // ✅ Find the user
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // ✅ Generate new access token
  const payload = { id: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);

  return res.status(200).json({
    success: true,
    message: "Access token refreshed successfully",
    data: { accessToken },
  });
});

// =============================================================Get all user==============================================
const getAllUsers = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers(req.query);

  const response: ApiResponse = {
    success: true,
    message: "Users retrieved successfully",
    data: result,
  };

  res.json(response);
});

const getUserById = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  const response: ApiResponse = {
    success: true,
    message: "User retrieved successfully",
    data: user,
  };

  res.json(response);
});

const updateUser = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData = updateUserSchema.parse(req.body);
  const user = await userService.updateUser(id, validatedData);

  const payload = { id: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  const response: ApiResponse = {
    success: true,
    message: "User updated successfully",
    data: { user, accessToken },
  };

  res.json(response);
});

const deleteUser = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.deleteUser(id);

  const response: ApiResponse = {
    success: true,
    message: result.message,
  };

  res.json(response);
});

const uploadAvatar = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const avatarUrl = (req.file as any).path;
  const user = await userService.updateAvatar(id, avatarUrl);

  const response: ApiResponse = {
    success: true,
    message: "Avatar uploaded successfully",
    data: user,
  };

  res.json(response);
});

const logoutUser = catchAsyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("refreshToken", cookieOptions);
  res.status(200).json({ success: true, message: "User logged out successfully" });
});




// ✅ Final Export Object
export const userController = {
  registerUser,
  loginUser,
  refreshAccessToken,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadAvatar,
  logoutUser


};
