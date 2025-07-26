
import { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { createStudentSchema, updateStudentSchema } from "./student.schema";
import { studentService } from "./student.service";

import { AppError } from "../../error/AppError";
import { createAccessToken, createRefreshToken } from "../../utils/jwt";
import { cookieOptions } from "../../utils/cookieOptions";
import { IStudent } from "./student.interface";

//============================================ create Student and Signup==============================================================
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const validatedData = createStudentSchema.parse(req.body);

  // Passport photo validation
  if (!req.file || !req.file.path) {
    throw new AppError("Passport photo is required", 400);
  }

  const passportPhoto = req.file.path;


  // Prepare student data
  const studentData = {
    ...validatedData,
    passportPhoto,
  };

  // Create student and update user role inside transaction
  const result = await studentService.createStudent(studentData as IStudent);

  const { student, user } = result;

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
    message: "Create Student and and signup sucesfully",
    data: { user, accessToken, student },
  });
});


// ======================================Get student byId===============================================
const getStudent = catchAsync(async (req: Request, res: Response) => {
  const student = await studentService.getStudentById(req.params.id);
  res.status(200).json({ success: true, data: student });
});

// =====================================get Student byUserid=================================================
const getStudentsByUserId = catchAsync(async (req: Request, res: Response) => {

  const student = await studentService.getStudentsByUserId(req.params.userId);

  res.status(200).json({ success: true, data: student });
});


// ===============================================Get All students=========================================
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const students = await studentService.getAllStudents();
  res.status(200).json({ success: true, data: students });
});


// ================================================update student====================================

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const validatedData = updateStudentSchema.parse(req.body);
  const updatedStudent = await studentService.updateStudentById(req.params.id, validatedData);
  res.status(200).json({ success: true, data: updatedStudent });
});




export const studentController = {
  createStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  getStudentsByUserId,

};
