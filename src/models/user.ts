import { UUID, DataTypes, Sequelize, UUIDV4 } from "sequelize";
import sequelize from '../config/sequelize';
import User from "../types/modelTypes/user";

User.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue:UUIDV4
    },
    ssoId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    underscored:true,
    freezeTableName:true,
  });

  export default User