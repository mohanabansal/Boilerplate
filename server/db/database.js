import Sequelize from "sequelize";

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/boilerplate",
  {
    logging: false
  }
);

module.exports = db;
