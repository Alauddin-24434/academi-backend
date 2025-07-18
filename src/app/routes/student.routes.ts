import express from "express";
import { studentController } from "../controllers/student.controller";

const router = express.Router();

router.post("/", studentController.createStudent);
router.get("/", studentController.getAllStudents);
router.get("/stats", studentController.getStudentStats);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.patch("/active/:id", studentController.activeStudent);

router.delete("/:id", studentController.deleteStudent);

export const studentRoutes = router;
