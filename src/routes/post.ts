import express from "express";
import {
  createMediaCtrl,
  getMediaCtrl,
  getMediasCtrl,
  updateMediaCtrl,
  deleteMediaCtrl,
} from "@/controllers/media";

const mediaRouter = express.Router();

// Get all media with optional pagination
mediaRouter.get("/", getMediasCtrl);

// Get single media by ID
// @ts-ignore
mediaRouter.get("/:id", getMediaCtrl);

// Create new media
// @ts-ignore
mediaRouter.post("/", createMediaCtrl);

// Update media by ID
// @ts-ignore
mediaRouter.put("/:id", updateMediaCtrl);

// Delete media by ID
// @ts-ignore
mediaRouter.delete("/:id", deleteMediaCtrl);

export default mediaRouter;
