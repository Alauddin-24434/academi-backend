import type { Request, Response } from "express"
import { catchAsyncHandler } from "../../utils/catchAsyncHandler"
import { sendResponse } from "../../utils/sendResponse"
import { staffService } from "./staff.service"

const createStaff = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await staffService.createStaffService(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Staff member created successfully",
    data: result,
  })
})

const getAllStaff = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await staffService.getAllStaffService()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Staff members retrieved successfully",
    data: result,
  })
})

const getStaffById = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await staffService.getStaffByIdService(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Staff member retrieved successfully",
    data: result,
  })
})

const updateStaff = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await staffService.updateStaffService(id, req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Staff member updated successfully",
    data: result,
  })
})

const deleteStaff = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  await staffService.deleteStaffService(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Staff member deleted successfully",
  })
})

export const staffController = {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
}
