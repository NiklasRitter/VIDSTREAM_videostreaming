import express from "express";
import requireUser from "../../middleware/requireUser";
import { getThumbnailHandler, updateThumbnailHandler, uploadThumbnailHandler } from "./thumbnail.controller";

const router = express.Router();

router.post("/", requireUser, uploadThumbnailHandler);

router.patch("/:thumbnailId", requireUser, updateThumbnailHandler);

router.get("/:thumbnailId", getThumbnailHandler);


export default router;
