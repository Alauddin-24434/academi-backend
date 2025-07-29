"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../../middleware/authenticate");
const overview_controller_1 = require("./overview.controller");
const router = express_1.default.Router();
router.get("/overviews", authenticate_1.authenticate, overview_controller_1.dashboardOverviewController);
exports.dashboardRoutes = router;
