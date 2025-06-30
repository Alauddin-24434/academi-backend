import express from "express";
import { loginUser, refreshTokenHandler, registrationUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", registrationUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshTokenHandler);

export const userRoutes=router;
