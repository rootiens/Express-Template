import express from "express";
import cors from "cors";
import sequelize from "./utils/db";
import userRoutes from "./routes/users";
import authRoutes from "./routes/authenticate";
require("dotenv").config();

const server = express();

server.use(express.json());
server.use(express.urlencoded());
server.use(cors());
server.use(userRoutes);
server.use(authRoutes);
server.use((req, res, next) => {
  res.status(404).json({
    message: "not found",
  });
});

sequelize;

server.listen(process.env.APP_PORT, () => {
  console.log(`App is running on port: ${process.env.APP_PORT}`);
});
