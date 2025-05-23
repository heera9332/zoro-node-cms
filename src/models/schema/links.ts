import mongoose, { Schema, Document } from "mongoose";

export interface ILink extends Document {
  name: string;
  url: string;
  description?: string;
  image?: string;
  target: "_blank" | "_self" | "_parent" | "_top";
  visible: boolean; // Whether the link is publicly visible
  owner: mongoose.Types.ObjectId | null; // User who added the link
  rating?: number; // Optional rating for the link
  notes?: string; // Extra notes
  rel?: string; // Relationship attributes (nofollow, sponsored, etc.)
}

const LinkSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true }, // Name of the link
    url: { type: String, required: true, trim: true }, // External URL
    description: { type: String, trim: true }, // Description of the link
    image: { type: String, trim: true }, // Link image (optional)
    target: {
      type: String,
      enum: ["_blank", "_self", "_parent", "_top"],
      default: "_blank",
    }, // Where to open the link
    visible: { type: Boolean, default: true }, // Whether the link is visible
    owner: { type: mongoose.Types.ObjectId, ref: "User", default: null }, // User who added the link
    rating: { type: Number, min: 0, max: 5 }, // Rating (optional)
    notes: { type: String, trim: true }, // Additional notes
    rel: { type: String, trim: true }, // Link relationship attributes (e.g., "nofollow")
  },
  { timestamps: true }
);

const Link = mongoose.model<ILink>("Link", LinkSchema);

export default Link;