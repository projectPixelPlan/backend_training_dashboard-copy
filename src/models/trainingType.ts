import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import TrainingType from "../types/modelTypes/trainingType";
import TrainingProgram from "../types/modelTypes/trainingProgram";

TrainingType.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    trainingType: {
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
        modelName: 'trainingType',
        tableName: 'trainingType',
        underscored: true,
        freezeTableName: true,
    }
);

export default TrainingType;