import { Model, DataTypes } from "sequelize";
import sequelize from "@config/database";
import { StatusApiKey } from "./ApiKey";

class ApiKey extends Model {}
ApiKey.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    apiKey: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: StatusApiKey.active,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "apiKey",
  }
);

export default ApiKey;
