import type { Request, Response } from "express";
import { createStudentSchema, updateStudentSchema, studentQuerySchema } from "../schemas/student.schema";
import type { ApiResponse } from "../interfaces";
import { studentService } from "../services/student.service";

// 1. Create Student
const createStudent = async (req: Request, res: Response) => {
  try {
    const validatedData = createStudentSchema.parse(req.body);
    const student = await studentService.createStudent(validatedData);

    const response: ApiResponse = {
      success: true,
      message: "Student created successfully",
      data: student,
    };

    res.status(201).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: "Failed to create student",
      error: error.message,
    };
    res.status(400).json(response);
  }
};

// 2. Get All Students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const validatedQuery = studentQuerySchema.parse(req.query);
    const result = await studentService.getAllStudents(validatedQuery);

    const response: ApiResponse = {
      success: true,
      message: "Students retrieved successfully",
      data: result,
    };

    res.json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: "Failed to retrieve students",
      error: error.message,
    };
    res.status(500).json(response);
  }
};

// 3. Get Student By ID
const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await studentService.getStudentById(id);

    const response: ApiResponse = {
      success: true,
      message: "Student retrieved successfully",
      data: student,
    };

    res.json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: "Failed to retrieve student",
      error: error.message,
    };
    res.status(404).json(response);
  }
};

// 4. Update Student
const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateStudentSchema.parse(req.body);
    const student = await studentService.updateStudent(id, validatedData);

    const response: ApiResponse = {
      success: true,
      message: "Student updated successfully",
      data: student,
    };

    res.json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: "Failed to update student",
      error: error.message,
    };
    res.status(400).json(response);
  }
};
const activeStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
   
    const student = await studentService.activateStudent(id);

    const response: ApiResponse = {
      success: true,
      message: "Student Active successfully",
      data: student,
    };

    res.json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: "Failed to update student",
      error: error.message,
    };
    res.status(400).json(response);
  }
};

// 5. Delete Student
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await studentService.deleteStudent(id);

    const response: ApiResponse = {
      success: true,
      message: result.message,
    };

    res.json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: "Failed to delete student",
      error: error.message,
    };
    res.status(404).json(response);
  }
};

// 6. Student Stats
const getStudentStats = async (req: Request, res: Response) => {
  try {
    const stats = await studentService.getStudentStats();

    const response: ApiResponse = {
      success: true,
      message: "Student statistics retrieved successfully",
      data: stats,
    };

    res.json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: "Failed to retrieve student statistics",
      error: error.message,
    };
    res.status(500).json(response);
  }
};

// ✅ Final Export Object
export const studentController = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentStats,
  activeStudent
};
