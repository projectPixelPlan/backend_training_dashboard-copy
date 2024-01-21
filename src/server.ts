import express from 'express';
import dotenv from 'dotenv';
import sequelizeSync from './services/sequelize';
import nominationRouter from '../src/routes/nominationRequests';

dotenv.config({ path: '.env' });
const app =express();
const PORT=process.env.PORT;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
sequelizeSync();

app.use(express.json());

app.use("/nomination",nominationRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
  });