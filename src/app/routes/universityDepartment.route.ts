import express from "express";
import { universityDepartmentController } from "../controllers/universityDepartment.controller";

const router = express.Router();

router.post("/", universityDepartmentController.createDepartment);
router.get("/", universityDepartmentController.getAllDepartments);
router.get("/:id", universityDepartmentController.getDepartmentById);
router.put("/:id", universityDepartmentController.updateDepartment);
router.delete("/:id", universityDepartmentController.deleteDepartment);

export const universityDepartmentRoutes= router;
