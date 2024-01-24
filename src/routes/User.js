import express from "express";

import { userModel } from "../models/UserModel.js";

import { getAllUsers } from "../queries/getAllUsers.js";

import { singUpClient } from "../queries/singUpClient.js";

import { GetByEmail } from "../queries/getByEmail.js";

import { DataBase } from "../database/database.js";

import { removeById } from "../queries/removeById.js";
import { where } from "sequelize";

const router = express.Router();

router.post("/singup", async (request, response) => {
  // res.header("Access-Control-Allow-Origin", "*");

  // res.header("Access-Control-Allow-Headers", "X-Requested-With");

  const userData = request.body;

  const users = await getAllUsers();

  const emails = users.map((obj) => obj.email);

  if (emails.includes(userData.email)) {
    response.status(401).json({
      message: "internal erro",
      error: "email já cadastrado",
    });
  } else {
    try {
      await singUpClient(
        userData.username,
        userData.sobrenome,
        userData.email,
        userData.password
      );

      response.status(201).json({
        message: "cliente criado com sucesso",
      });
    } catch (error) {
      response.status(401).json({
        message: "internal erro",
        error: error,
      });
    }
  }
});

router.get("/getAllUsers", async (req, res) => {
  const data = req.body;

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  const users = await getAllUsers()
    .then((Data) => {
      const JsonFormated = Data;

      res.status(201).json({
        message: "sucess to reach all users",
        data: JsonFormated,
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: "internal error",
        error,
      });
    });
});

router.get("/getbyemail", async (req, res) => {
  const data = req.body;

  const email = data.email;

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  const users = await GetByEmail(email)
    .then((Data) => {
      const JsonFormated = Data;
      if (JsonFormated[0]) {
        res.status(201).json({
          message: "sucess to reach  users by email",
          data: JsonFormated,
        });
      } else {
        res.status(401).json({
          message: " error",
          error: "user was not found",
        });
      }
    })
    .catch((error) => {
      res.status(401).json({
        message: "internal error",
        error: error,
      });
    });
});

router.delete("/removebyid:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (id) {
    const userId = await removeById(id);

    if (userId === 1) {
      res.status(200).json({
        message: "user removido",
        id: id,
      });
    } else {
      res.status(400).json({
        error: "usuário não encontrado ",
      });
    }
  } else {
    res.status(400).json({
      error: "id não é number ",
    });
  }
});

router.put("/editbyid:id", (req, res) => {
  const idReq = parseInt(req.params.id);

  const fields = req.body;

  if (fields && idReq) {
    userModel
      .update(fields, { where: { id: idReq } })
      .then((afct) => {
        console.log(afct[0]);
        if (afct[0] === 1) {
          res.status(200).json({
            message: "dados editado",
            editados: afct,
          });
        } else {
          res.status(400).json({
            message: "dados não editados",
            erro: "id duplicado",
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          message: "deu ruim",
          erro: error,
        });
      });
  }
});

export default router;
