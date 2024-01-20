import { userModel } from "../models/UserModel.js";

const GetByEmail = async (Email) => {
  const users = await userModel.findAll({
    where: {
      email: Email,
    },
  });

  return users;
};

export { GetByEmail };
