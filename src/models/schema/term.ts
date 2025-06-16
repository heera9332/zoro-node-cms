import mongoose, { Schema, Document } from "mongoose";

export interface ITerm extends Document {
  name: string;
  slug: string;
}

const TermSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true }
);

// Auto-generate slug before saving
TermSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

TermSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: Document, ret: Record<string, any>) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Term = mongoose.model<ITerm>("Term", TermSchema);

export default Term;