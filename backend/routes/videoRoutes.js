import express from "express";

import {
  getVideoInfo,
  downloadVideo,
} from "../controllers/videoController.js";

const router = express.Router();

router.post("/info", getVideoInfo);

router.post("/download", downloadVideo);

export default router;