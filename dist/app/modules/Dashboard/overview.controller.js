"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardOverviewController = void 0;
const catchAsyncHandler_1 = require("../../utils/catchAsyncHandler");
const overview_service_1 = require("./overview.service");
exports.dashboardOverviewController = (0, catchAsyncHandler_1.catchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const overview = yield (0, overview_service_1.getDashboardOverview)({ id: req.user.id, role: req.user.role });
    res.status(200).json({ success: true, data: overview });
}));
