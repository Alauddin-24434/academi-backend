// controllers/admin.controller.ts
import { Request, Response } from "express";
import { catchAsyncHandler } from "../../utils/catchAsyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { adminService } from "./admin.service";

const createAdmin = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await adminService.createAdminService(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

 const getAllAdmins = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await adminService.getAllAdminsService();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admins retrieved successfully",
    data: result,
  });
});

 const getAdminById = catchAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.getAdminByIdService(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin retrieved successfully",
    data: result,
  });
});



export const adminController={
  createAdmin,
  getAdminById,
  getAllAdmins
}