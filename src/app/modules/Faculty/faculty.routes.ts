import express from "express";
import { facultyController } from "./faculty.controller";

const router = express.Router();
 
router.post('/', facultyController.createFaculty);
router.get('/', facultyController.getAllFaculties);


export const facultyRoutes = router;
