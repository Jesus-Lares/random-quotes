import { Sequelize } from "sequelize";
import env from "./env";

// eslint-disable-next-line object-curly-newline
const { database, username, password, storage, hostDatabase: host } = env;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
  logging: false,
  ...(storage.length ? { storage } : { dialectOptions: { ssl: {} } }),
});

export default sequelize;
