import path from "path";
import fs from "fs/promises";
import { Post } from "@/models";
import { type IPost } from "@/models/schema/posts";

// Create media post (postType = 'attachment')
const createMedia = async (payload: Partial<IPost>) => {
  const newMedia = new Post({ ...payload, postType: "attachment" });
  await newMedia.save();
  return newMedia;
};

// Update media post by id
const updateMedia = async (id: string, payload: Partial<IPost>) => {
  return Post.findByIdAndUpdate(id, payload, { new: true });
};

// Delete media post by id and remove file from disk
const deleteMedia = async (id: string) => {
  const media = await Post.findById(id);
  if (!media || media.postType !== "attachment")
    throw new Error("Media not found");

  // Extract local file path from media.url (adjust if URL structure differs)
  const uploadsRoot = path.resolve("uploads");
  const relativePath = media.url?.split("/uploads/")[1];
  if (relativePath) {
    const fullPath = path.join(uploadsRoot, relativePath);
    try {
      await fs.unlink(fullPath);
    } catch (err: any) {
      console.warn("File delete failed or already gone:", err.message);
    }
  }

  return await media.deleteOne();
};

// Get media post by id
const getMedia = async (id: string) => {
  return Post.findOne({ _id: id, postType: "attachment" });
};

// Get list of media posts with optional query, pagination
const getMedias = async (mongoQuery = {}, limit = 10, skip = 0) => {
  return Post.find({ postType: "attachment", ...mongoQuery })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export { createMedia, updateMedia, deleteMedia, getMedia, getMedias };
