const { DataTypes } = require("sequelize");
import sequelize from "../utils/db";
// import validator from "validator";

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
      },
    },
  },
  {
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;
