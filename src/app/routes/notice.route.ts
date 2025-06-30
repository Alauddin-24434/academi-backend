import express from "express";
import * as noticeController from "../controllers/notice.controller";

const noticeRouter = express.Router();

noticeRouter.post("/", noticeController.createNotice);
noticeRouter.get("/", noticeController.getAllNotices);
noticeRouter.get("/:id", noticeController.getNoticeById);
noticeRouter.put("/:id", noticeController.updateNotice);
noticeRouter.delete("/:id", noticeController.deleteNotice);

export default noticeRouter;
