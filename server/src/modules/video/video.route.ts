import express from "express";
import requireUser from "../../middleware/requireUser";
import {
  findPublishedVideosHandler,
  streamVideoHandler,
  updateVideoHandler,
  uploadVideoHandler,
} from "./video.controller";

const router = express.Router();

router.post("/", requireUser, uploadVideoHandler);

router.patch("/:videoId", requireUser, updateVideoHandler);

router.get("/:videoId", streamVideoHandler);

// no user required, because no need to be logged in to find videos
router.get("/", findPublishedVideosHandler);

export default router;
