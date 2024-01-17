import { TrainingPrograms } from "../types/modelTypes/trainingPrograms";
import sequelize from "../config/sequelize";
import Sequelize, { DataTypes } from "sequelize";

TrainingPrograms.init({
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    TrainingTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    TrainingMode: {
        type: DataTypes.ENUM('Online', 'Offline'),
        allowNull: false,
    },
    StartDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    EndDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    AvailableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    OccuranceType: {
        type: DataTypes.ENUM('Daily', 'Weekly', 'Monthly'),
        allowNull: false,
    },
    OccuranceInterval: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Status: {
        type: DataTypes.ENUM('Upcoming', 'Ongoing', 'Completed', 'Cancelled', 'Postponed'),
        allowNull: false,
    },
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    IsActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
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
        modelName: 'TrainingPrograms',
        tableName: 'trainingPrograms',
    }
);

export { TrainingPrograms };