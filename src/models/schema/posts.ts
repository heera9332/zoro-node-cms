import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, default: "Untitled" },
    content: { type: String, trim: true, default: "" },
    excerpt: { type: String, trim: true }, // Short description
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "pending", "published", "private", "trash"],
      default: "draft",
    },
    postType: { type: String, trim: true, default: "post" }, // Can be 'post' or 'page'
    author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    parent: { type: mongoose.Types.ObjectId, ref: "Post", default: null }, // Parent post/page
    categories: [{ type: mongoose.Types.ObjectId, ref: "Category" }], // Post categories
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }], // Tags for the post
    featuredImage: { type: String, trim: true }, // URL to featured image
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }], // Linked comments
    meta: { type: mongoose.Schema.Types.Mixed }, // Custom meta fields
    taxonomies: [{ type: mongoose.Types.ObjectId, ref: "Taxonomy" }], // Categories & Tags
    views: { type: Number, default: 0 }, // View count
    likes: { type: Number, default: 0 }, // Like count
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from title before saving
PostSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

const Post = mongoose.model("Post", PostSchema);
export default Post;