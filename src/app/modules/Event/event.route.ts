import express from "express"
import { validateRequest } from "../../middleware/validateRequest"

import { eventController } from "./event.controller"
import { createEventZodSchema, updateEventZodSchema } from "./event.validation"

const router = express.Router()

router.post("/", validateRequest(createEventZodSchema), eventController.createEvent)
router.get("/", eventController.getAllEvents)
router.get("/:id", eventController.getEventById)

router.patch("/:id", validateRequest(updateEventZodSchema), eventController.updateEvent)
router.delete("/:id", eventController.deleteEvent)

export const eventRoutes = router
