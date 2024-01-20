import { userModel } from "../models/UserModel.js";

const getAllUsers = async () => {
  const users = await userModel.findAll();
  return users;
};

export { getAllUsers };
