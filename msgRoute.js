import express from "express";
import {getMessage, sendMessage } from "../controllers/msgcontrol.js";
import isauth from "../middleware/isauth.js";

const router = express.Router();

router.route("/send/:id").post(isauth,sendMessage);
router.route("/:id").get(isauth,getMessage);

export default router;