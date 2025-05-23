import mongoose, { Document, Schema } from "mongoose";

export interface ITermRelationship extends Document {
  post: mongoose.Types.ObjectId;
  termTaxonomy: mongoose.Types.ObjectId;
}

const TermRelationshipSchema: Schema = new Schema(
  {
    post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
    termTaxonomy: {
      type: mongoose.Types.ObjectId,
      ref: "TermTaxonomy",
      required: true,
    },
  },
  { timestamps: true }
);

const TermRelationship = mongoose.model<ITermRelationship>(
  "TermRelationship",
  TermRelationshipSchema
);

export default TermRelationship;