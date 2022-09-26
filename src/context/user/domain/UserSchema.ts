import { Model, DataTypes } from "sequelize";
import sequelize from "@config/database";
import { UserRole } from "./User";

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: UserRole.client,
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    allQuotes: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

export default User;
