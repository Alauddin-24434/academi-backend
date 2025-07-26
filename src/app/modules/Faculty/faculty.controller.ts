import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { facultyService } from "./faculty.service";

 const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const faculty = await facultyService.createFaculty(req.body);
  res.status(201).json({ status: "success", data: faculty });
});

 const getFacultyById = catchAsync(async (req: Request, res: Response) => {
  const faculty = await facultyService.getFacultyById(req.params.id);
  res.status(200).json({ status: "success", data: faculty });
});

 const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const faculties = await facultyService.getAllFaculties();
  res.status(200).json({ status: "success", data: faculties });
});

 const updateFacultyById = catchAsync(async (req: Request, res: Response) => {
  const faculty = await facultyService.updateFacultyById(req.params.id, req.body);
  res.status(200).json({ status: "success", data: faculty });
});

 const deleteFacultyById = catchAsync(async (req: Request, res: Response) => {
  await facultyService.deleteFacultyById(req.params.id);
  res.status(204).json({ status: "success", data: null });
});

export const facultyController={
  createFaculty,
  getFacultyById,
  getAllFaculties,
  updateFacultyById,
  deleteFacultyById,
};
