import { Router } from "express"
import { userController } from "./user.controller"
import { authenticate } from "../../middleware/authenticateHandler"
import { authorize } from "../../middleware/authorizeHandler"
const router = Router()

router.post("/login", userController.loginUser)
router.get("/refreshToken", userController.refreshAccessToken)
router.get("/",  authenticate, authorize("ADMIN"), userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.put("/:id", userController.updateUser)



export const userRoutes= router
