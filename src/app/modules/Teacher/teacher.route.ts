import express from "express";

import { upload } from "../../lib/cloudinary"; 
import { teacherController } from "../Teacher/teacher.controller";
import { authenticate } from "../../middleware/authenticateHandler";
import { authorize } from "../../middleware/authorizeHandler";

const router = express.Router();

// Create teacher with passportPhoto upload
router.post("/", authenticate, authorize("ADMIN"), upload.single("passportPhoto"), teacherController.createTeacher);

// Get all teachers
router.get("/", teacherController.getAllTeachers);

// Get teacher by ID
router.get("/:id", teacherController.getTeacher);

// Update teacher by ID
router.put("/:id", teacherController.updateTeacher);

export const teacherRoutes = router;
