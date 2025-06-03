import { type Request, type Response } from "express";
import {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} from "@/services"; // Adjust path as needed

// Create a new post
export const createPostCtrl = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    if (!payload.title || !payload.content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const post = await createPost(payload);
    res.status(201).json({ success: true, post });
  } catch (error: any) {
    console.error("Create post error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a post by ID
export const getPostCtrl = async (req: Request, res: Response) => {
  try {
    const post = await getPost(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ success: true, post });
  } catch (error: any) {
    console.error("Get post error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get multiple posts with optional filters and pagination
export const getPostsCtrl = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = parseInt(req.query.skip as string) || 0;

    const { title, slug } = req.query;

    // Build filter object dynamically
    const filter: any = {};

    if (slug && typeof slug === "string") {
      filter.slug = slug; // exact match
    }

    if (title && typeof title === "string") {
      filter.title = { $regex: title, $options: "i" }; // partial, case-insensitive
    }

    const posts = await getPosts(filter, limit, skip);
    res.json({ success: true, posts });
  } catch (error: any) {
    console.error("Get posts error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a post by ID
export const updatePostCtrl = async (req: Request, res: Response) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ success: true, post: updatedPost });
  } catch (error: any) {
    console.error("Update post error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a post by ID
export const deletePostCtrl = async (req: Request, res: Response) => {
  try {
    const deleted = await deletePost(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ success: true, message: "Post deleted" });
  } catch (error: any) {
    console.error("Delete post error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
