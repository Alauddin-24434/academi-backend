import express from "express";
import { departmentController } from "./department.controller";

const router = express.Router();
 
router.post('/', departmentController.createDepartment);
router.get('/', departmentController.getAllDepartments);


export const departmentRoutes = router;
