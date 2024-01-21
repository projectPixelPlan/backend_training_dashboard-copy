import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import ProgramTrainerMapping from "../types/modelTypes/programTrainerMapping";

ProgramTrainerMapping.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    trainingProgramId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    trainerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        modelName: 'programTrainerMapping',
        tableName: 'programTrainerMapping',
        underscored: true,
        freezeTableName: true,
    }
);

export default ProgramTrainerMapping;