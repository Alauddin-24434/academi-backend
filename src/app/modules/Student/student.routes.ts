import express from "express";

import { upload } from "../../lib/cloudinary";
import { studentController } from "./student.controller";

const router = express.Router();

router.post("/", upload.single("passportPhoto"), studentController.createStudent);
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudent);

router.get("/user/:userId", studentController.getStudentsByUserId); // এখানে user id

router.put("/:id", studentController.updateStudent);


export const studentRoutes = router;
