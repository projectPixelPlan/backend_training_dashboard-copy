import { Model } from "sequelize";

class ProgramAudienceMapping extends Model {
    public id?: number; 
    public trainingProgramId!: number;
    public audienceId!: number;
    public isActive?: Boolean;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

export default ProgramAudienceMapping;