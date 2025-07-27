import express from "express";
import { eventController } from "./event.controller";

const router = express.Router();

router.post("/", eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEvent);
router.put("/:id",  eventController.updateEvent);

export const eventRoutes = router;
