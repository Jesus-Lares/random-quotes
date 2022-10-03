import { Model, DataTypes } from "sequelize";
import sequelize from "@config/database";

class ViewQuotes extends Model {}
ViewQuotes.init(
  {
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    quote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "ViewQuotes",
  }
);

export default ViewQuotes;
