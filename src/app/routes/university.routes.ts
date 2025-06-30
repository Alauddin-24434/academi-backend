import express from "express";
import * as universityController from "../controllers/university.controller";

const router = express.Router();

router.post("/", universityController.createUniversity);
router.get("/", universityController.getAllUniversities);
router.get("/:id", universityController.getUniversityById);
router.put("/:id", universityController.updateUniversity);
router.delete("/:id", universityController.deleteUniversity);

export const universityRoutes= router;
