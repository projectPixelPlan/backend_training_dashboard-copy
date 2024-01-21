import { Request, Response } from 'express';
import TrainingProgram from '../../models/trainingProgram';
import csv from 'csv-parser';
import fs from 'fs';
 
const uploadTrainingProgramCsv = async (req: Request, res: Response) => {
  try {
    console.log(req.file)
    if (!req.file) {
      return res.status(422).json({ error: 'Invalid request, CSV file not provided' });
    }
 
    const csvData: any[] = [];
    const stream = fs.createReadStream(req.file.path);
   
    stream
      .pipe(csv())
      .on('data', (row) => {
          csvData.push(row);
      })
    .on('end', async () => {
        try {
          if (csvData.length === 0) {
            return res.status(422).json({ message: 'No valid CSV records found' });
          }
      
          // Extract unique titles and startDates from the csvData
          const titles = csvData.map((record) => record.title);
          const startDates = csvData.map((record) => new Date(record.startDate));
      
          // Check for existing training programs
          const existingTrainingPrograms = await TrainingProgram.findAll({
            where: {
              title: titles,
              startDate: startDates,
              status: 'Upcoming',
            },
          });
      
          if (existingTrainingPrograms.length > 0) {
            return res.status(422).json({ message: 'Some CSV records already exist.' });
          } 
          else {
            const newTrainingProgram = await TrainingProgram.bulkCreate(csvData);
            return res.status(201).json({ message: 'Training program added successfully',  ...newTrainingProgram,});
          }
        } 
        catch (error) {
          console.error('Error during processing and database insertion:', error);
          return res.status(500).json({ error: 'Internal server error' });
        } 
        finally {
          // Cleanup: Remove the uploaded file after processing
          fs.unlinkSync(req.file?.path || ''); // Using optional chaining and nullish coalescing
        }
      });
  }   
  catch (error) {
    if (error instanceof Error) {
      console.error('Error during processing and database insertion:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    } 
    else {
      console.error('Unknown error during processing and database insertion:', error);
      res.status(500).json({ error: 'Internal server error', details: 'Unknown error occurred' });
    }
  }
};
 
export default uploadTrainingProgramCsv;
