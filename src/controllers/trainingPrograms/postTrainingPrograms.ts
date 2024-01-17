import { Request, Response } from 'express';
import { TrainingPrograms } from '../../models/trainingPrograms';

const addTrainingPrograms = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const trainingPrograms: TrainingPrograms = req.body;

    delete trainingPrograms.Id

    try {
        if (!trainingPrograms) {
            return res.status(422).json({ error: 'Invalid request. Missing required fields.' });
        }

        const addedTrainingProgram = await TrainingPrograms.create({ ...trainingPrograms });
        console.log(addedTrainingProgram);
        return res.status(200).json({ message: 'Training programs added successfully' });
    }
    catch (error: any) {
        return res.status(500).json({ error: error.toString() });
    }
};

export { addTrainingPrograms };

