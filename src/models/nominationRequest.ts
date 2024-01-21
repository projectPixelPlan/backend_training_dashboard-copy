import { DataTypes, Sequelize } from 'sequelize';
import NominationRequest from '../types/modelTypes/nominationRequest'
import sequelize from '../config/sequelize';

NominationRequest.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  trainingProgramId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assignerId: {
    type: DataTypes.UUID,
    allowNull: false,
    // references: {
    //   model: User,
    //   key: 'id',
    // },
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected', 'Removed'),
    allowNull: false,
  },
  remarks: {
    type: DataTypes.TEXT,
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  updatedBy: {
    type: DataTypes.UUID,
    // references: {
    //   model: User,
    //   key: 'id',
    // },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull:true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull:true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
},
{
    sequelize,
    modelName:'nominationRequest',
    tableName:'nominationRequest',
    underscored: true,
    freezeTableName: true
}
);

export default NominationRequest;
