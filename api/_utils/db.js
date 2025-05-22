import { Sequelize, DataTypes } from "sequelize";

// Uses environment variables defined in Vercel dashboard for DB config
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

export { sequelize, DataTypes };

