"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authenticateHandler_1 = require("../../middleware/authenticateHandler");
const authorizeHandler_1 = require("../../middleware/authorizeHandler");
const dashboard_controller_1 = require("./dashboard.controller");
const router = express_1.default.Router();
router.get("/", authenticateHandler_1.authenticate, (0, authorizeHandler_1.authorize)("ADMIN", "STUDENT"), dashboard_controller_1.dashboardOverview);
exports.dashboardRoutes = router;
