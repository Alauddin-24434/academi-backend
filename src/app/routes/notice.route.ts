import express from "express";
import * as noticeController from "../controllers/notice.controller";

const router = express.Router();

router.post("/", noticeController.createNotice);
router.get("/", noticeController.getAllNotices);
router.get("/:id", noticeController.getNoticeById);
router.put("/:id", noticeController.updateNotice);
router.delete("/:id", noticeController.deleteNotice);

export const noticeRoutes= router;
