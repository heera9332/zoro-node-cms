import mongoose, { Schema, Document } from "mongoose";

export interface IOption extends Document {
  name: string;
  value: any; // Can store any type (string, number, object, etc.)
  autoload: boolean; // Determines if the option should be auto-loaded
}

const OptionSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }, // Unique option name (like "siteurl", "blogname")
    value: { type: Schema.Types.Mixed, required: true }, // Can store any type of value
    autoload: { type: Boolean, default: true }, // Whether to automatically load this option
  },
  { timestamps: true }
);

OptionSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: Document, ret: Record<string, any>) {
    ret.id = ret._id;
    delete ret._id;
  },
});


const Option = mongoose.model<IOption>("Option", OptionSchema);

export default Option;