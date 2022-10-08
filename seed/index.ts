/* eslint-disable no-restricted-syntax */
import {
  createApiKey,
  createDailyQuotes,
  createQuotes,
  createUser,
  createViewQuotes,
  dropApiKeysTableSQL,
  dropDailyQuotesTableSQL,
  dropQuotesTableSQL,
  dropUsersTableSQL,
  dropViewQuotesTableSQL,
} from "./sql";

import sequelize from "../src/config/database";

const dropTables = [
  dropUsersTableSQL,
  dropQuotesTableSQL,
  dropViewQuotesTableSQL,
  dropApiKeysTableSQL,
  dropDailyQuotesTableSQL,
];
const createTables = [
  createUser,
  createQuotes,
  createViewQuotes,
  createApiKey,
  createDailyQuotes,
];

const loadAndSaveData = async () => {
  try {
    const querys: any = [];
    for (const dropQuery of dropTables) querys.push(sequelize.query(dropQuery));

    for (const createQuery of createTables) {
      querys.push(sequelize.query(createQuery));
    }

    await Promise.all(querys);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

loadAndSaveData();
