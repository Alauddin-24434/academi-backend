import express from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { createStaffZodSchema, updateStaffZodSchema } from "./staff.validation"
import { staffController } from "./staff.controller"

const router = express.Router()

router.post("/", validateRequest(createStaffZodSchema), staffController.createStaff)
router.get("/", staffController.getAllStaff)
router.get("/:id", staffController.getStaffById)
router.patch("/:id", validateRequest(updateStaffZodSchema), staffController.updateStaff)
router.delete("/:id", staffController.deleteStaff)

export const staffRoutes = router
