import express from "express";
import { facultyController } from "./faculty.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createFacultyZodSchema } from "./faculty.schema";

const router = express.Router();

router.post('/', validateRequest(createFacultyZodSchema), facultyController.createFaculty);
router.get('/', facultyController.getAllFaculties);


export const facultyRoutes = router;
