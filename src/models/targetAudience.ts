import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import TargetAudience from "../types/modelTypes/targetAudience";

TargetAudience.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date(),
    },
}, 
    {
        sequelize,
        modelName: 'targetAudience',
        tableName: 'targetAudience',
        underscored: true,
        freezeTableName: true,
    }
);

export default TargetAudience;