import mongoose, { Document, Schema } from "mongoose";

export interface ICommentMeta extends Document {
  comment: mongoose.Types.ObjectId;
  key: string;
  value: any;
}

const CommentMetaSchema: Schema = new Schema(
  {
    comment: { type: mongoose.Types.ObjectId, ref: "Comment", required: true }, // Associated comment
    key: { type: String, required: true, trim: true }, // Meta key
    value: { type: Schema.Types.Mixed, required: true }, // Meta value (can store any type)
  },
  { timestamps: true }
);

CommentMetaSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: Document, ret: Record<string, any>) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const CommentMeta = mongoose.model<ICommentMeta>(
  "CommentMeta",
  CommentMetaSchema
);

export default CommentMeta;