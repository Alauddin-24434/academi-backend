import { Request, Response } from "express";
import { createAcademicSessionSchema } from "./academicSession.schema";
import { catchAsync } from "../../utils/catchAsync";
import { academicSessionService } from "./academicSession.service";
import { IAcademicSession } from "./academicSession.interface";

const createAcademicSessionHandler = catchAsync(async (req: Request, res: Response) => {

  const validatedData = createAcademicSessionSchema.parse(req.body);

  const session = await academicSessionService.createAcademicSession(validatedData as IAcademicSession);

  res.status(201).json(session);

})

const getAllAcademicSessionsHandler = catchAsync(async (req: Request, res: Response) => {

  const sessions = await academicSessionService.getAllAcademicSessions();
  res.status(200).json({
    success: true,
    message: "Session retrive sucessfully",
    data: sessions
  });

})


export const academicSessionController = {
  createAcademicSessionHandler,
  getAllAcademicSessionsHandler
}