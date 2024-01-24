import express from "express";

import { userModel } from "./src/models/UserModel.js";

import userRoutes from "./src/routes/User.js";

import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/status", (request, response) => {
  const status = {
    status: "funcionando",
  };
  response.header("Access-Control-Allow-Origin", "*");

  response.status(200).json({
    message: status,
  });
});
