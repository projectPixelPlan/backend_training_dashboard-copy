import { Request, Response } from 'express';
import TrainingType from '../../models/trainingType';

const addTrainingType = async (req: Request, res: Response): Promise <any> => {
    try {
        const { trainingType } = req.body;
        console.log(trainingType)
        if (!trainingType) {
            return res.status(422).json({ error: 'Invalid request. Missing required fields.' });
        }

        const isExisting = await TrainingType.findOne({ where: { trainingType }, raw: true, });

        if(isExisting) {
            return res.status(409).json({ message: 'Training Type already exists' });
        }
        else {
            const addedTrainingType = await TrainingType.create({ trainingType, raw: true});
            return res.status(200).json({ message: 'Training Type added successfully'});
        }
    }
    catch (error: any) {
        return res.status(500).json({ error: error.toString() });
    }
};

export default addTrainingType;