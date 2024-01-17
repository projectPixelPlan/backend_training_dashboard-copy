import express, { Request, Response, Router } from 'express';
import { addTrainingPrograms } from '../../controllers/trainingPrograms/postTrainingPrograms';
import { viewTrainingPrograms } from '../../controllers/trainingPrograms/getTrainingPrograms';

const adminRouter: Router = express.Router();

adminRouter.post("/addTrainingProgram", async (req: Request, res: Response) => {
    addTrainingPrograms(req, res);
});

adminRouter.get("/viewTrainingProgram", async (req: Request, res: Response) => {
    viewTrainingPrograms(req, res);
})

export default adminRouter;