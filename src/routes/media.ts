import { upload } from "@/config";
import path from "path";
import fs from "fs";
import config from "@/node-zoro-cms.config";
import express, { type NextFunction } from "express";

import {
  createMediaCtrl,
  getMediaCtrl,
  getMediasCtrl,
  updateMediaCtrl,
  deleteMediaCtrl,
} from "@/controllers";

const mediaRoot = path.resolve(process.cwd(), config.mediaDir);

// Ensure media directory exists
if (!fs.existsSync(mediaRoot)) {
  fs.mkdirSync(mediaRoot, { recursive: true });
}

const mediaRouter = express.Router();

// GET all media with pagination/filtering
mediaRouter.get("/", getMediasCtrl);

// GET media by id
// @ts-ignore
mediaRouter.get("/:id", getMediaCtrl);

// POST create media with file upload middleware
// @ts-ignore
mediaRouter.post("/", upload.single("file"), async (req: Request, res : Response, next: NextFunction) => {
  try {
    // @ts-ignore
    if (!req.file) {
      // @ts-ignore
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Attach file info + any other form fields to req.formData for controller
    req.formData = {
      // @ts-ignore
      url: `/uploads/${req.file.filename}`,
      // @ts-ignore
      filename: req.file.filename,
      // @ts-ignore
      mimetype: req.file.mimetype,
      // @ts-ignore
      size: req.file.size,
      // add any other fields you want to save from req.body here
      ...req.body,
    };

    await createMediaCtrl(req, res);
  } catch (error) {
    next(error);
  }
});

// PUT update media by id
// @ts-ignore
mediaRouter.put("/:id", updateMediaCtrl);

// DELETE media by id
// @ts-ignore
mediaRouter.delete("/:id", deleteMediaCtrl);

export default mediaRouter;
