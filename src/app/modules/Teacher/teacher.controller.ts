import { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { createTeacherSchema, updateTeacherSchema } from "./teacher.schema";
import { teacherService } from "./teacher.service";

import { AppError } from "../../error/AppError";
import { createAccessToken, createRefreshToken } from "../../utils/jwt";
import { cookieOptions } from "../../utils/cookieOptions";
import { ITeacher } from "./teacher.interface";

// ============================================
// Create Teacher and Signup
// ============================================
const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const validatedData = createTeacherSchema.parse(req.body);

  // Passport photo validation
  if (!req.file || !req.file.path) {
    throw new AppError("Passport photo is required", 400);
  }

  const passportPhoto = req.file.path;

  const teacherData = {
    ...validatedData,
    passportPhoto,
  };

  // Create teacher and user inside transaction
  const result = await teacherService.createTeacher(teacherData as ITeacher & { password: string; email: string });

  const { teacher, user } = result;

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
    message: "Teacher created and signup successfully",
    data: { user, accessToken, teacher },
  });
});

// ============================================
// Get Teacher by ID
// ============================================
const getTeacher = catchAsync(async (req: Request, res: Response) => {
  const teacher = await teacherService.getTeacherById(req.params.id);
  res.status(200).json({ success: true, data: teacher });
});

// ============================================
// Get All Teachers
// ============================================
const getAllTeachers = catchAsync(async (req: Request, res: Response) => {
  const teachers = await teacherService.getAllTeachers();
  res.status(200).json({ success: true, data: teachers });
});

// ============================================
// Update Teacher
// ============================================
const updateTeacher = catchAsync(async (req: Request, res: Response) => {
  const validatedData = updateTeacherSchema.parse(req.body);
  const updatedTeacher = await teacherService.updateTeacherById(req.params.id, validatedData);
  res.status(200).json({ success: true, data: updatedTeacher });
});

export const teacherController = {
  createTeacher,
  getTeacher,
  getAllTeachers,
  updateTeacher,
};
