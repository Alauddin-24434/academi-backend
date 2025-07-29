import type { Request, Response } from "express"
import { catchAsyncHandler } from "../../utils/catchAsyncHandler"
import { sendResponse } from "../../utils/sendResponse"
import { studentService } from "./student.service"

const createStudent = catchAsyncHandler(async (req: Request, res: Response) => {
  const passportPhoto = req.file?.path;
  const bodyData = {
    ...req.body,
    passportPhoto
  }
  const result = await studentService.createStudentService(bodyData)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Student created successfully",
    data: result,
  })
})

const getAllStudents = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await studentService.getAllStudentsService()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Students retrieved successfully",
    data: result,
  })
})

const getStudentById = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await studentService.getStudentByIdService(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student retrieved successfully",
    data: result,
  })
})

const updateStudent = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await studentService.updateStudentService(id, req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student updated successfully",
    data: result,
  })
})

const updateStudentStatus = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { status, reason } = req.body
  const result = await studentService.updateStudentStatusService(id, status, reason)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student status updated successfully",
    data: result,
  })
})

const deleteStudent = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  await studentService.deleteStudentService(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student deleted successfully",
  })
})

export const studentController = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
}
