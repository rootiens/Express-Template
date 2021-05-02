const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

try {
  sequelize.authenticate();
  sequelize.sync();
  console.log(
    "Connection has been established successfully and models migrated!"
  );
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
