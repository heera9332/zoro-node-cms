import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  post: mongoose.Types.ObjectId; // Post ID
  author: mongoose.Types.ObjectId | null; // Registered user or null for guest
  authorName?: string; // Name of guest commenter
  authorEmail?: string; // Email of guest commenter
  authorUrl?: string; // Website URL (optional)
  content: string;
  status: "approved" | "pending" | "spam"; // Comment status
  parent?: mongoose.Types.ObjectId | null; // Parent comment ID for threading
  userAgent?: string; // Browser information
  ipAddress?: string; // IP address of commenter
  meta?: Record<string, any>; // Custom metadata
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    post: { type: mongoose.Types.ObjectId, ref: "Post", required: true }, // Associated Post
    author: { type: mongoose.Types.ObjectId, ref: "User", default: null }, // Registered User (Optional)
    authorName: { type: String, trim: true }, // Guest Name
    authorEmail: { type: String, trim: true, lowercase: true }, // Guest Email
    authorUrl: { type: String, trim: true }, // Guest Website URL
    content: { type: String, required: true, trim: true }, // Comment Text
    status: {
      type: String,
      enum: ["approved", "pending", "spam"],
      default: "pending",
    }, // Approval Status
    parent: { type: mongoose.Types.ObjectId, ref: "Comment", default: null }, // Parent Comment (For Nested Replies)
    userAgent: { type: String, trim: true }, // Browser Details
    ipAddress: { type: String, trim: true }, // Commenter's IP Address
    meta: { type: Schema.Types.Mixed }, // Custom Metadata
  },
  { timestamps: true }
);

CommentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: Document, ret: Record<string, any>) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;