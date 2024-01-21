import { Request, Response } from 'express';
import TrainingProgram from '../../models/trainingProgram';
import csv from 'csv-parser';
import fs from 'fs';
import xlsx from 'xlsx';

const uploadTrainingProgramCsvOrExcel = async (req: Request, res: Response) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(422).json({ error: 'Invalid request, file not provided' });
    }

    const fileExtension = (req.file.originalname || '').split('.').pop();

    if (fileExtension === 'csv') {
      return handleCsvUpload(req.file.path, res);
    } else if (fileExtension === 'xls' || 'xlsx') {
      return handleExcelUpload(req.file.path, res);
    } else {
      return res.status(422).json({ error: 'Unsupported file format' });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during processing and database insertion:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    } else {
      console.error('Unknown error during processing and database insertion:', error);
      res.status(500).json({ error: 'Internal server error', details: 'Unknown error occurred' });
    }
  }
};

const handleCsvUpload = async (filePath: string, res: Response) => {
  const csvData: any[] = [];
  const stream = fs.createReadStream(filePath);

  stream
    .pipe(csv())
    .on('data', (row) => {
      csvData.push(row);
    })
    .on('end', async () => {
      await processAndInsertData(csvData, res);
      cleanupAfterProcessing(filePath);
    });
};

const handleExcelUpload = async (filePath: string, res: Response) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  await processAndInsertData(excelData, res);
  cleanupAfterProcessing(filePath);
};

const processAndInsertData = async (data: any[], res: Response) => {
  try {
    if (data.length === 0) {
      return res.status(422).json({ message: 'No valid records found in the file' });
    }

    const titles = data.map((record) => record.title);
    const startDates = data.map((record) => new Date(record.startDate));

    const existingTrainingPrograms = await TrainingProgram.findAll({
      where: {
        title: titles,
        startDate: startDates,
        status: 'Upcoming',
      },
    });

    if (existingTrainingPrograms.length > 0) {
      return res.status(200).json({ message: 'Some records already exist.' });
    } else {
      const newTrainingPrograms = await TrainingProgram.bulkCreate(data);
      return res.status(201).json({
        message: 'Data added successfully',
        newTrainingPrograms,
      });
    }
  } catch (error) {
    console.error('Error during processing and database insertion:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const cleanupAfterProcessing = (filePath: string) => {
  fs.unlinkSync(filePath);
};

export default uploadTrainingProgramCsvOrExcel;

