"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const event_controller_1 = require("./event.controller");
const event_validation_1 = require("./event.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.validateRequest)(event_validation_1.createEventZodSchema), event_controller_1.eventController.createEvent);
router.get("/", event_controller_1.eventController.getAllEvents);
router.get("/:id", event_controller_1.eventController.getEventById);
router.patch("/:id", (0, validateRequest_1.validateRequest)(event_validation_1.updateEventZodSchema), event_controller_1.eventController.updateEvent);
router.delete("/:id", event_controller_1.eventController.deleteEvent);
exports.eventRoutes = router;
