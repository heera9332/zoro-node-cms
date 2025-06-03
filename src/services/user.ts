import { User, type IUser } from "@/models/schema/users";
import mongoose from "mongoose";

// Create a new user
export const createUser = async (payload: Partial<IUser>): Promise<IUser> => {
  const user = new User(payload);
  return user.save();
};

// Get all users
export const getUsers = async (): Promise<IUser[]> => {
  return User.find({}).exec();
};

// Get single user by ID
export const getUser = async (id: string): Promise<IUser | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return User.findById(id).exec();
};

// Update user by ID
export const updateUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return User.findByIdAndUpdate(id, data, { new: true }).exec();
};

// Delete user by ID
export const deleteUser = async (id: string): Promise<IUser | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return User.findByIdAndDelete(id).exec();
};
