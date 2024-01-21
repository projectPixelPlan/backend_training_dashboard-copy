import express from 'express';
import dotenv from 'dotenv';
import sequelizeSync from './services/sequelize';
import trainingProgram from './routes/trainingProgram';
import uploadTrainingProgramCsv from './controllers/trainingProgram/uploadTrainingProgramCsv';
import trainingType from './routes/trainingType';

dotenv.config({ path: '.env' });
const app =express();
const PORT=process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
sequelizeSync();

app.use(trainingProgram);
app.use(trainingType);

app.post("/test",uploadTrainingProgramCsv);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
  });