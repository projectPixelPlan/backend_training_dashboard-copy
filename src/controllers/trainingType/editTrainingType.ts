import { Request, Response } from 'express';
import TrainingType from '../../models/trainingType';

const editTrainingType = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    try {
        const { id, trainingType } = req.body;
        if(!id || !trainingType) {
            return res.status(422).json({ error: "Invalid request, Missing required filed." });
        }

        const isExists = await TrainingType.findOne({ attributes: ['trainingType'], where: { id }});

        if(trainingType === isExists?.trainingType) {
            return res.status(304).json({error: "No changes made. Data is already up to date."})
        }
        else {
            const editedTrainingType = await TrainingType.update( { trainingType }, { where: { id } });
            return res.status(200).json({ message: "Training type updated successfully" });
        }
    }
    catch(error: any) {
        return res.status(500).json({ error: error.toString() });
    }
};

export default editTrainingType;