// src/routes/application.routes.ts
import express from "express";
import * as applicationController from "../controllers/application.controller";

const router = express.Router();

router.post("/", applicationController.createApplication);
router.get("/", applicationController.getAllApplications);
router.get("/:id", applicationController.getApplicationById);
router.put("/:id", applicationController.updateApplication);
router.delete("/:id", applicationController.deleteApplication);

export const applicationRoutes= router;
