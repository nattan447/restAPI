import { DataTypes } from "sequelize";

import { DataBase } from "../database/database.js";

const userModel = DataBase.define("Client", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

userModel.sync();

export { userModel };
