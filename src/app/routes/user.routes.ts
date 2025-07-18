import { Router } from "express"


import { userController } from "../controllers/user.controller"
import { upload } from "../lib/cloudinary"
import { authenticate } from "../middleware/authenticateHandler"
import { authorize } from "../middleware/authorizeHandler"

const router = Router()

router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/refreshToken", userController.refreshAccessToken)
router.get("/",  authenticate, authorize("ADMIN"), userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.put("/:id", userController.updateUser)
router.delete("/:id", authenticate, authorize("ADMIN"), userController.deleteUser)
router.post("/:id/avatar", upload.single("avatar"), userController.uploadAvatar)

export const userRoutes= router
