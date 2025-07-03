import express from "express";
import { githubCallback, githubLoginRedirect, googleCallback, googleLoginRedirect, loginUser, refreshTokenHandler, registrationUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", registrationUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshTokenHandler);

// OAuth Routes
router.get("/google/login", googleLoginRedirect);
router.get("/google/callback", googleCallback);

router.get("/github/login", githubLoginRedirect);
router.get("/github/callback", githubCallback);

export const userRoutes= router;
