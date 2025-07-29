import express from "express";
import { departmentController } from "./department.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDepartmentZodSchema } from "./department.validation";

const router = express.Router();
 
router.post('/', validateRequest(createDepartmentZodSchema), departmentController.createDepartment);
router.get('/', departmentController.getAllDepartments);
router.patch('/:id', departmentController.updateDepartmentById);
router.delete('/:id', departmentController.deleteDepartmentById);


export const departmentRoutes = router;
