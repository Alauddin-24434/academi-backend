import express from "express";

import { upload } from "../../lib/cloudinary"; // অথবা যেখানে upload middleware আছে
import { teacherController } from "../Teacher/teacher.controller";

const router = express.Router();

// Create teacher with passportPhoto upload
router.post("/", upload.single("passportPhoto"), teacherController.createTeacher);

// Get all teachers
router.get("/", teacherController.getAllTeachers);

// Get teacher by ID
router.get("/:id", teacherController.getTeacher);

// Update teacher by ID
router.put("/:id", teacherController.updateTeacher);

export const teacherRoutes = router;
