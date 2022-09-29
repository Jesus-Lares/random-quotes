import { Model, DataTypes } from "sequelize";
import sequelize from "@config/database";

class DailyQuote extends Model {}
DailyQuote.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    quote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expired: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: "dailyQuote",
  }
);

export default DailyQuote;
