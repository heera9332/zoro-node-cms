import express from "express";
import {
  createUserCtrl,
  getUserCtrl,
  getUsersCtrl,
  updateUserCtrl,
  deleteUserCtrl,
} from "@/controllers"; // adjust path

const userRouter = express.Router();

userRouter.get("/", getUsersCtrl); // Get all users
// @ts-ignore
userRouter.get("/:id", getUserCtrl); // Get user by ID
// @ts-ignore
userRouter.post("/", createUserCtrl); // Create user
// @ts-ignore
userRouter.put("/:id", updateUserCtrl); // Update user by ID
// @ts-ignore
userRouter.delete("/:id", deleteUserCtrl); // Delete user by ID

export default userRouter;
