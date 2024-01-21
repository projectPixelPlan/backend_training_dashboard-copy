import express, { Request, Response, Router } from 'express';
import addTrainingType from '../controllers/trainingType/addTrainingType';
import viewTrainingType from '../controllers/trainingType/getTrainingType';
import editTrainingType from '../controllers/trainingType/editTrainingType';

const trainingType : Router = express.Router();

trainingType.post("/addTrainingType", async (req: Request, res: Response) => {
    addTrainingType(req, res);
});

trainingType.get("/viewTrainingType", async (req: Request, res: Response) => {
    viewTrainingType(req, res);
});

trainingType.patch("/editTrainingType", async (req: Request, res: Response) => {
    editTrainingType(req, res);
});

export default trainingType;