// routes/admin.route.ts
import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createAdminZodSchema } from "./admin.validation";
import { adminController } from "./admin.controller";

const router = express.Router();

router.post("/", validateRequest(createAdminZodSchema), adminController.createAdmin);
router.get("/", adminController.getAllAdmins);
router.get("/:id", adminController.getAdminById);

export const adminRoutes= router;
