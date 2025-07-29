import { Request, Response } from "express";
import { catchAsyncHandler } from "../../utils/catchAsyncHandler";
import { academicSessionService } from "./academicSession.service";
import { sendResponse } from "../../utils/sendResponse";

export const createAcademicSession = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await academicSessionService.createAcademicSession(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Academic session created successfully",
    data: result,
  });
});

export const getAllAcademicSessions = catchAsyncHandler(async (_req: Request, res: Response) => {
  const result = await academicSessionService.getAllAcademicSessions();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All academic sessions fetched",
    data: result,
  });
});

export const getSingleAcademicSession = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await academicSessionService.getSingleAcademicSession(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic session fetched",
    data: result,
  });
});

export const updateAcademicSession = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await academicSessionService.updateAcademicSession(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic session updated",
    data: result,
  });
});

export const deleteAcademicSession = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await academicSessionService.deleteAcademicSession(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic session deleted (soft)",
    data: result,
  });
});



export const academicSessionController = {
createAcademicSession,
getSingleAcademicSession,
getAllAcademicSessions,
updateAcademicSession,
deleteAcademicSession
}