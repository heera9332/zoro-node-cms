import { type Request, type Response } from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "@/services"; // adjust import path

// Create user
export const createUserCtrl = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    // Basic validation example — adjust as needed
    if (!payload.email || !payload.password || !payload.username) {
      return res
        .status(400)
        .json({ error: "username, email and password are required" });
    }

    const user = await createUser(payload);
    res.status(201).json({ success: true, user });
  } catch (error: any) {
    console.error("Create user error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all users
export const getUsersCtrl = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json({ success: true, users });
  } catch (error: any) {
    console.error("Get users error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user by ID
export const getUserCtrl = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, user });
  } catch (error: any) {
    console.error("Get user error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user by ID
export const updateUserCtrl = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, user: updatedUser });
  } catch (error: any) {
    console.error("Update user error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete user by ID
export const deleteUserCtrl = async (req: Request, res: Response) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (error: any) {
    console.error("Delete user error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
