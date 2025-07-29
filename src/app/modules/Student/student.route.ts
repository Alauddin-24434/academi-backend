import express from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { createStudentZodSchema, updateStudentZodSchema, updateStudentStatusZodSchema } from "./student.validation"
import { studentController } from "./student.controller"
import { upload } from "../../lib/cloudinary"

const router = express.Router()

router.post("/", upload.single("passportPhoto"), validateRequest(createStudentZodSchema), studentController.createStudent)
router.get("/", studentController.getAllStudents)
router.get("/:id", studentController.getStudentById)
router.patch("/:id", validateRequest(updateStudentZodSchema), studentController.updateStudent)
router.patch("/:id/status", validateRequest(updateStudentStatusZodSchema), studentController.updateStudentStatus)
router.delete("/:id", studentController.deleteStudent)

export const studentRoutes = router
