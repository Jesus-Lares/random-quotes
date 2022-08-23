import { Sequelize } from "sequelize";
import env from "./env";

// eslint-disable-next-line object-curly-newline
const { database, username, password, storage } = env;

const sequelize = new Sequelize(database, username, password, {
  dialect: "mysql",
  storage,
  logging: false,
});

export default sequelize;
