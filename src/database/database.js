import { Sequelize } from "sequelize";

const DataBase = new Sequelize("Caregiver", "nattan", "1234", {
  host: "localhost",
  dialect: "sqlite",
  storage: "../database/sqlite.sqlite",
});

export { DataBase };
