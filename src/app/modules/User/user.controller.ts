import { Request, Response } from "express";
import { catchAsyncHandler } from "../../middleware/catchAsyncHandler";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../../utils/jwt";
import { cookieOptions } from "../../utils/cookieOptions";
import { prisma } from "../../lib/prisma";
import { userService } from "./user.service";
import { loginSchema, updateUserSchema } from "./user.schema";



// ================================Login user==================================================

const loginUser = catchAsyncHandler(async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);

  const user = await userService.loginUserByEmail(validatedData);


  // success
  const payload = { id: user.id, role: user.role };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

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
  const refreshTokenRaw = req.cookies?.refreshToken || (req.headers["x-refresh-token"] as string);

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
  const accessToken = createAccessToken(payload);

  return res.status(200).json({
    success: true,
    message: "Access token refreshed successfully",
    data: { user, accessToken },
  });
});

// =============================================================Get all user==============================================
const getAllUsers = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers(req.query);

  const response = {
    success: true,
    message: "Users retrieved successfully",
    data: result,
  };

  res.json(response);
});

//==============================================================Get user byID=================================================
const getUserById = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  const response = {
    success: true,
    message: "User retrieved successfully",
    data: user,
  };

  res.json(response);
});

// ============================================================updateUser======================================================

const updateUser = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData = updateUserSchema.parse(req.body);
  const user = await userService.updateUser(id, validatedData);

  const payload = { id: user.id, role: user.role };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  const response = {
    success: true,
    message: "User updated successfully",
    data: { user, accessToken },
  };

  res.json(response);
});









// ✅ Final Export Object
export const userController = {

  loginUser,
  refreshAccessToken,
  getAllUsers,
  getUserById,
  updateUser,



};
