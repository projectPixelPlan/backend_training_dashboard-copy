import { Request, Response, query } from "express";
import { TrainingPrograms } from "../../models/trainingPrograms";

const viewTrainingPrograms = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {

        let { status } = req.query;

        let query;

        if (status === ('upcoming' || 'postponed' || 'completed')) {
            query = { IsActive: true, Status: status };
        } else {
            query = { IsActive: true };
        }

        const trainingProgram = await TrainingPrograms.findAll({
            attributes: ['Title', 'Description', 'TrainingTypeId', 'TrainingMode', 'StartDate', 'EndDate', 'Duration', 'AvailableSeats', 'OccuranceType', 'OccuranceInterval', 'Status', 'createdAt'],
            where: query,
            raw: true,
        });
        return res.status(200).json({ ...trainingProgram });
    }
    catch (error: any) {
        return res.status(500).json({ error: error.toString() });
    }
};

export { viewTrainingPrograms };