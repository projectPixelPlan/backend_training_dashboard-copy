import { UUID } from "crypto";
import { Model } from "sequelize";

class UserTraining extends Model {
    public id?: number;
    public userId!: UUID;
    public trainingProgramId!: number;
    public completionStatus!: 'Enrolled' | 'Ongoing' | 'Hold' | 'Completed' | 'Dropout';
    public isActive!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
  }

export default UserTraining






