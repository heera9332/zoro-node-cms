import { Post } from "@/models";
import { type IPost } from "@/models/schema/posts";

// Create post
export const createPost = async (payload: Partial<IPost>) => {
  const post = new Post(payload);
  return post.save();
};

// Get post by id
export const getPost = async (id: string) => {
  return Post.findById(id)
    .populate("author", "username displayName email")
    .exec();
};

// Get all posts (optionally filter by postType or status)
export const getPosts = async (filter: Partial<IPost> = {}, limit: number, skip: number) => {
  return Post.find(filter)
    .populate("author", "username displayName email")
    .sort({ createdAt: -1 })
    .exec();
};

// Update post by id
export const updatePost = async (id: string, payload: Partial<IPost>) => {
  return Post.findByIdAndUpdate(id, payload, { new: true }).exec();
};

// Delete post by id
export const deletePost = async (id: string) => {
  return Post.findByIdAndDelete(id).exec();
};
