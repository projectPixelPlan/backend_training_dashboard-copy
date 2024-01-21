import { Request, Response } from 'express';
import TrainingType from '../../models/trainingType';

const viewTrainingType = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    try {
        const trainingType = await TrainingType.findAll({ raw: true });
        return res.status(200).json({ ...trainingType });
    }
    catch(error: any) {
        return res.status(500).json({ error: error.toString() });
    }
};

export default viewTrainingType;