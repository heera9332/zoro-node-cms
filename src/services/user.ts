import { User } from "@/models";

const getUsers = async () => {
  const users = await User.find({});
  return users;
};

const getUser = async (id: string) => {
  const user = await User.find({ id });
  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.deleteOne(id);
  return user;
};

const updateUser = async (id: string, user) => {
  const tmp = await User.updateOne({ id }, user);
  return tmp;
};

export { getUser, getUsers, updateUser, deleteUser };
