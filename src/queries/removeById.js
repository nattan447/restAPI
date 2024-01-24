import { userModel } from "../models/UserModel.js";

async function removeById(userId) {
  try {
    const userDelete = await userModel.destroy({
      where: {
        id: userId,
      },
    });

    return userDelete;
  } catch (error) {
    console.log("ERRO", error);
  }
}

export { removeById };
