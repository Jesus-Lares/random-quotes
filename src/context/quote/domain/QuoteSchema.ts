import { Model, DataTypes } from "sequelize";
import sequelize from "@config/database";
import { UserRole } from "@context/user/domain/User";

class Quotes extends Model {
  id: any;
}
Quotes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quote: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: UserRole.client,
      allowNull: false,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Quotes",
  }
);

export default Quotes;
