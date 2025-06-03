import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  displayName: string; // Public-facing name
  email: string;
  password: string;
  roles: string[];
  refreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    displayName: { type: String, trim: true, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    roles: {
      type: [String], // array of strings
      enum: ["admin", "user", "student", "subscriber", "editor"],
      default: ["user"], // default role inside array
      required: true,
    },

    refreshToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export interface IUserMeta extends Document {
  user: mongoose.Types.ObjectId;
  key: string;
  value: any;
}

const UserMetaSchema: Schema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    key: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const UserMeta = mongoose.model<IUserMeta>("UserMeta", UserMetaSchema);

export { User, UserMeta };
