// types.d.ts
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export interface IUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  password: string;
  role: Array<"admin" | "user" | "subscriber" | "student" | "editor">;
  refreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}
