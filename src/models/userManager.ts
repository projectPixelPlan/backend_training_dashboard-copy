import { DataTypes, UUID, Sequelize } from "sequelize";
import sequelize from "../config/sequelize";
import UserManager from "../types/modelTypes/userManager";

UserManager.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: UUID,
        allowNull: false,
      },
      managerId: {
        type: UUID,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      modelName: 'userManager',
      tableName: 'userManager',
      underscored: true,
      freezeTableName: true,
    }
  );
  
  export default UserManager