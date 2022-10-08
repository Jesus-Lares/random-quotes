/* eslint-disable operator-linebreak */
export const dropUsersTableSQL = "DROP TABLE IF EXISTS Users";
export const dropQuotesTableSQL = "DROP TABLE IF EXISTS Quotes";
export const dropViewQuotesTableSQL = "DROP TABLE IF EXISTS ViewQuotes";
export const dropApiKeysTableSQL = "DROP TABLE IF EXISTS ApiKeys";
export const dropDailyQuotesTableSQL = "DROP TABLE IF EXISTS DailyQuotes";

export const createDailyQuotes =
  "CREATE TABLE `DailyQuotes` ( `userId` int NOT NULL, `quote` int NOT NULL, `expired` date, `createdAt` date, `updatedAt` date, PRIMARY KEY (`userId`),UNIQUE KEY `userId` (`userId`));";

export const createApiKey =
  "CREATE TABLE `ApiKeys` ( `userId` int NOT NULL, `apiKey` varchar(500) NOT NULL, `status` varchar(10) DEFAULT 'active', `createdAt` date, `updatedAt` date, PRIMARY KEY (`apiKey`),UNIQUE KEY `apiKey` (`apiKey`),UNIQUE KEY `userId` (`userId`));";

export const createQuotes =
  "CREATE TABLE `Quotes` ( `id` int NOT NULL AUTO_INCREMENT, `quote` varchar(500) NOT NULL, `writer` varchar(255) NOT NULL, `role` varchar(8) NOT NULL, `user` INT, `createdAt` date, `updatedAt` date,PRIMARY KEY (`id`),UNIQUE KEY `id` (`id`));";

export const createViewQuotes =
  "CREATE TABLE `ViewQuotes` ( `quote` int NOT NULL, `user` int  NOT NULL, `createdAt` date, `updatedAt` date,PRIMARY KEY (`user`, `quote`))";

export const createUser =
  "CREATE TABLE `Users` ( `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL,`password` varchar(255) NOT NULL, `role` varchar(8) NOT NULL, `state` tinyint(1) DEFAULT '1', `allQuotes` tinyint(1) NOT NULL DEFAULT '1', `createdAt` date, `updatedAt` date,PRIMARY KEY (`id`),UNIQUE KEY `email` (`email`));";
