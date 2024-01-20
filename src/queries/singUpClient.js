import { userModel } from "../models/UserModel.js";

const singUpClient = async (Nome, Sobrenome, Email, Password) => {
  const user = await userModel.create({
    nome: Nome,
    email: Email,
    password: Password,
  });

  console.log(user.toJSON());
};

export { singUpClient };
