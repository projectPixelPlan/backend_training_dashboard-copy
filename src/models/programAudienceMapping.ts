import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import ProgramAudienceMapping from "../types/modelTypes/programAudienceMapping";

ProgramAudienceMapping.init({
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
    audienceId: {
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
        modelName: 'programAudienceMapping',
        tableName: 'programAudienceMapping',
        underscored: true,
        freezeTableName: true,
    }
);

export default ProgramAudienceMapping;