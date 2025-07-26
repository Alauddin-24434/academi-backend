import express from "express";
import { authenticate } from "../../middleware/authenticateHandler";
import { authorize } from "../../middleware/authorizeHandler";
import { dashboardOverview } from "./dashboard.controller";
const router = express.Router();
router.get("/", authenticate, authorize("ADMIN", "STUDENT"), dashboardOverview);


export const dashboardRoutes = router;
