import express from "express";
import * as circularController from "../controllers/circular.controller";

const router = express.Router();

router.post("/", circularController.createCircular);
router.get("/", circularController.getAllCirculars);
router.get("/:id", circularController.getCircularById);
router.put("/:id", circularController.updateCircular);
router.delete("/:id", circularController.deleteCircular);

export const circularRoutes= router;
