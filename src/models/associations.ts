import TrainingProgram from "../types/modelTypes/trainingProgram";
import TrainingType from "../types/modelTypes/trainingType";
import ProgramAudienceMapping from "./programAudienceMapping";
import TargetAudience from "./targetAudience";

const associate = () => {
    TrainingProgram.hasOne(TrainingType, { foreignKey: 'id' });
    TrainingType.belongsTo(TrainingProgram, { foreignKey: 'id' });
    
    TrainingProgram.hasMany(ProgramAudienceMapping, { foreignKey: 'trainingProgramId' });
    ProgramAudienceMapping.belongsTo(TrainingProgram, { foreignKey: 'trainingProgramId' });

    TargetAudience.hasOne(ProgramAudienceMapping, { foreignKey: 'audienceId' });
    ProgramAudienceMapping.belongsTo(TargetAudience, { foreignKey: 'audienceId' });
}

export default associate;
