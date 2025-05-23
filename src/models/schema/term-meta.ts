import mongoose, { Document, Schema } from "mongoose";

export interface ITermMeta extends Document {
  term: mongoose.Types.ObjectId;
  key: string;
  value: any;
}

const TermMetaSchema: Schema = new Schema(
  {
    term: { type: mongoose.Types.ObjectId, ref: "Term", required: true },
    key: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true }, // Can be any type
  },
  { timestamps: true }
);

const TermMeta = mongoose.model<ITermMeta>("TermMeta", TermMetaSchema);

export default TermMeta;