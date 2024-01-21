import TrainingProgram  from "../types/modelTypes/trainingProgram";
import sequelize from "../config/sequelize";
import { DataTypes } from "sequelize";

TrainingProgram.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trainingTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trainingMode: {
        type: DataTypes.ENUM('Online', 'Offline'),
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    occuranceType: {
        type: DataTypes.ENUM('Daily', 'Weekly', 'Monthly'),
        allowNull: false,
    },
    occuranceInterval: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Upcoming', 'Ongoing', 'Completed', 'Cancelled', 'Postponed'),
        allowNull: false,
        defaultValue: 'Upcoming',
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
        modelName: 'trainingProgram',
        tableName: 'trainingProgram',
        underscored: true,
        freezeTableName: true,
    }
);

export default TrainingProgram ;