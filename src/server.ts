import express from 'express';
import dotenv from 'dotenv';
import sequelizeSync from './services/sequelize';


dotenv.config({ path: 'src/.env' });
const app =express();
const PORT=process.env.PORT;

sequelizeSync();


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
  });