import { Request, Response } from 'express';
import TrainingProgram from '../../models/trainingProgram';
import ProgramAudienceMapping from '../../models/programAudienceMapping';
import ProgramTrainerMapping from '../../models/programTrainerMapping';
import sequelize from '../../config/sequelize';
import TargetAudience from '../../models/targetAudience';

const addTrainingProgram = async (req: Request, res: Response): Promise<any> => {
    const trainingProgram = req.body;
    console.log(trainingProgram.startDate);

    const transaction = await sequelize.transaction();
    try {
        if (!trainingProgram) {
            return res.status(422).json({ error: 'Invalid request. Missing required fields.' });
        }

        const isExisting = await TrainingProgram.findOne({
            where: { title: trainingProgram.title, startDate: trainingProgram.startDate, duration: trainingProgram.duration, status: 'Upcoming' },
            raw: true,
        });

        if (isExisting) {
            return res.status(409).json({ message: 'Program already exists' });
        } 
        else {
            const addedTrainingProgram = await TrainingProgram.create(trainingProgram, { transaction: transaction });

            const audienceData = trainingProgram.audienceId.map((id: TargetAudience) => ({
                trainingProgramId: addedTrainingProgram.id,
                audienceId: id,
            }));
            await ProgramAudienceMapping.bulkCreate(audienceData, { transaction: transaction });

            const trainerData = trainingProgram.trainerId.map((id: any) => ({
                trainingProgramId: addedTrainingProgram.id,
                trainerId: id,
            }));
            await ProgramTrainerMapping.bulkCreate(trainerData, { transaction: transaction });

            await transaction.commit();
            res.status(200).json({ message: 'Training program added successfully.' });
        }
    } 
    catch (error: any) {
        await transaction.rollback();
        return res.status(500).json({ error: error.toString() });
    }
}

export default addTrainingProgram;
