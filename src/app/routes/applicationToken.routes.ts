import express from "express";
import * as tokenController from "../controllers/applicationToken.controller";

const router = express.Router();

router.post("/", tokenController.createToken);
router.get("/:userId", tokenController.getTokenByUserId);
router.put("/:userId", tokenController.updateToken);
router.delete("/:userId", tokenController.deleteToken);

export const applicationTokenRoutes= router;
