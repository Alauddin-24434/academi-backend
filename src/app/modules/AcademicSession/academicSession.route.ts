import express from "express";
import { academicSessionController } from "./academicSession.conntroller";

const router = express.Router();
 
router.post('/', academicSessionController.createAcademicSessionHandler);
router.get('/', academicSessionController.getAllAcademicSessionsHandler);


export const academicSessionRoutes = router;
