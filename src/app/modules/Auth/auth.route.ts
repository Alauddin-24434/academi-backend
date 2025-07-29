import { Router } from "express"
import { AuthController } from "./auth.controller"
import { validateRequest } from "../../middleware/validateRequest"
import { loginValidationSchema, registerValidationSchema } from "./auth.validation"
import { upload } from "../../lib/cloudinary"

const router = Router()

router.post("/signup", upload.single("avatar"), validateRequest(registerValidationSchema), AuthController.register)

router.post("/login", validateRequest(loginValidationSchema), AuthController.login)
router.get("/refreshToken", AuthController.refreshAccessToken)
router.post("/logout", AuthController.logout)

export const authRoutes = router
