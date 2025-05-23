import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

export interface ITermTaxonomy extends Document {
  term: mongoose.Types.ObjectId;
  taxonomy: "category" | "tag" | string; // Custom taxonomies supported
  description?: string;
  parent?: mongoose.Types.ObjectId | null; // Parent term for hierarchy
  count: number; // Number of posts using this term
}

const TermTaxonomySchema: Schema = new Schema(
  {
    term: { type: mongoose.Types.ObjectId, ref: "Term", required: true },
    taxonomy: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    parent: { type: mongoose.Types.ObjectId, ref: "TermTaxonomy", default: null }, // Parent term (for hierarchical taxonomies)
    count: { type: Number, default: 0 }, // Number of associated posts
  },
  { timestamps: true }
);

const TermTaxonomy = mongoose.model<ITermTaxonomy>("TermTaxonomy", TermTaxonomySchema);

export default TermTaxonomy;