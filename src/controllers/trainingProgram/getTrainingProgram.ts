// import { Request, Response } from "express";
// import TrainingProgram  from "../../models/trainingProgram";
// import associate from "../../models/associations";
// import ProgramAudienceMapping from "../../models/programAudienceMapping";
// import TargetAudience from "../../models/targetAudience";
// import TrainingType from "../../models/trainingType";

// associate();

// const viewTrainingProgram = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const { role } = req.body;
//         if (!role) {
//             return res.status(422).json({error: 'Invalid request. Missing required fields.'});
//         }

//         let statusFilter: string[] = [];

//         if (role === 'admin') {
//             statusFilter = ['Upcoming', 'Postponed', 'Completed'];
//         } 
//         else if (role === 'manager' || role === 'employee') {
//             statusFilter = ['Upcoming', 'Postponed'];
//         }

//         const trainingProgram = await TrainingProgram.findAll({
//             attributes: ['title', 'description', 'trainingMode', 'startDate', 'endDate', 'duration', 'availableSeats', 'occuranceType', 'occuranceInterval', 'status'],
//             where: { status: statusFilter },
//             order: [['startDate', 'ASC'], ['status', 'ASC']],
//             // raw: true,
//             include: [
//                 {
//                     model: TrainingType,
//                     attributes: ['trainingType'],
//                 },
//                 {
//                     model: ProgramAudienceMapping,
//                     include: [
//                         {
//                             model: TargetAudience,
//                             attributes: ['name'],
//                         },
//                     ],
//                 },
//             ],
//             raw: true,
//         });

//         return res.status(200).json({ ...trainingProgram });
//     }
//     catch (error: any) {
//         return res.status(500).json({ error: error.toString() });
//     }
// };

// export default viewTrainingProgram;

import { Request, Response } from "express";
import TrainingProgram from "../../models/trainingProgram";
import associate from "../../models/associations";
import ProgramAudienceMapping from "../../models/programAudienceMapping";
import TargetAudience from "../../models/targetAudience";
import TrainingType from "../../models/trainingType";

associate();

const viewTrainingProgram = async (req: Request, res: Response): Promise<any> => {
    try {
        const { role } = req.body;
        if (!role) {
            return res.status(422).json({ error: 'Invalid request. Missing required fields.' });
        }

        let statusFilter: string[] = [];

        if (role === 'admin') {
            statusFilter = ['Upcoming', 'Postponed', 'Completed'];
        } 
        else if (role === 'manager' || role === 'employee') {
            statusFilter = ['Upcoming', 'Postponed'];
        }

        const trainingPrograms = await TrainingProgram.findAll({
            attributes: [
                'title', 'description', 'trainingMode', 'startDate', 'endDate',
                'duration', 'availableSeats', 'occuranceType', 'occuranceInterval', 'status'
            ],
            where: { status: statusFilter },
            order: [['startDate', 'ASC'], ['status', 'ASC']],
            include: [
                {
                    model: TrainingType,
                    attributes: ['trainingType'],
                },
                {
                    model: ProgramAudienceMapping,
                    attributes: ['audienceId'], 
                    include: [
                        {
                            model: TargetAudience,
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });

        return res.status(200).json(trainingPrograms);
    } catch (error: any) {
        return res.status(500).json({ error: error.toString() });
    }
};

export default viewTrainingProgram;
