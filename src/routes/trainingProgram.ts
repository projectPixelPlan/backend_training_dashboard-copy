import express, { Request, Response, Router } from 'express';
import addTrainingProgram from '../controllers/trainingProgram/addTrainingProgram';
import  viewTrainingProgram  from '../controllers/trainingProgram/getTrainingProgram';
import uploadTrainingProgramCsv from '../controllers/trainingProgram/uploadTrainingProgramCsv';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const trainingProgram: Router = express.Router();

trainingProgram.post("/addTrainingProgram", async (req: Request, res: Response) => {
    addTrainingProgram(req, res);
});

trainingProgram.get("/viewTrainingProgram", async (req: Request, res: Response) => {
    viewTrainingProgram(req, res);
});
 
trainingProgram.post('/uploadTrainingProgram', upload.single('csvFile'), (req: Request, res:Response) =>{
  uploadTrainingProgramCsv(req,res)
});


export default trainingProgram;