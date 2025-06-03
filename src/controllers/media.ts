import { type Request, type Response } from "express";
import {
  createMedia,
  getMedia,
  getMedias,
  updateMedia,
  deleteMedia,
} from "@/services/media";

// Create media
export const createMediaCtrl = async (req: Request, res: Response) => {
  try {
    const formData = req.formData; // Make sure formData middleware is setup
    if (!formData) {
      return res.status(400).json({ error: "No media data provided" });
    }
    const media = await createMedia(formData);
    res.status(201).json({ success: true, media });
  } catch (error: any) {
    console.error("Create media error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single media by ID
export const getMediaCtrl = async (req: Request, res: Response) => {
  try {
    const media = await getMedia(req.params.id);
    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }
    res.json({ success: true, media });
  } catch (error: any) {
    console.error("Get media error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get multiple media with pagination
export const getMediasCtrl = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = parseInt(req.query.skip as string) || 0;
    // Optional: filter from query params (e.g. by author, type)
    const filter = {}; // customize as needed

    const medias = await getMedias(filter, limit, skip);
    res.json({ success: true, medias });
  } catch (error: any) {
    console.error("Get medias error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update media by ID
export const updateMediaCtrl = async (req: Request, res: Response) => {
  try {
    const updatedMedia = await updateMedia(req.params.id, req.body);
    if (!updatedMedia) {
      return res.status(404).json({ error: "Media not found" });
    }
    res.json({ success: true, media: updatedMedia });
  } catch (error: any) {
    console.error("Update media error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete media by ID
export const deleteMediaCtrl = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteMedia(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Media not found" });
    }
    res.json({ success: true, message: "Media deleted" });
  } catch (error: any) {
    console.error("Delete media error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
