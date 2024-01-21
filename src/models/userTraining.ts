import { UUID, DataTypes, Sequelize } from "sequelize";
import sequelize from '../config/sequelize';
import UserTraining from "../types/modelTypes/userTraining";

UserTraining.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    userId: {
        type: UUID,
        allowNull: false,
        // references: {
        //     model: User,
        //     key: 'id',
        // },
    },
    trainingProgramId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: TrainingProgram,
        //     key: 'id',
        // },
    },
    completionStatus: {
        type: DataTypes.ENUM('Enrolled', 'Ongoing', 'Hold', 'Completed', 'Dropout'),
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
    modelName: 'UserTraining',
    tableName: 'userTraining',
    underscored:true,
    freezeTableName:true,
  });

  export default UserTraining