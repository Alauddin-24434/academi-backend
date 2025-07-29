import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createAcademicSessionZodSchema, updateAcademicSessionZodSchema } from "./academicSession.validition";
import { academicSessionController } from "./academicSession.conntroller";

const router = express.Router();

router.post(
  "/",
  validateRequest(createAcademicSessionZodSchema),
  academicSessionController.createAcademicSession
);

router.get("/",   academicSessionController.getAllAcademicSessions);
router.get("/:id",   academicSessionController.getSingleAcademicSession);

router.patch(
  "/:id",
  validateRequest(updateAcademicSessionZodSchema),
    academicSessionController.updateAcademicSession
);

router.delete("/:id",   academicSessionController.deleteAcademicSession);

export const academicSessionRoutes = router;
