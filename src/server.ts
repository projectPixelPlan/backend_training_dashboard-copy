import express from 'express';
import dotenv from 'dotenv';
import sequelizeSync from './services/sequelize';
import adminRouter from './routes/trainingPrograms/adminRoutes';

dotenv.config({ path: '.env' });
const app =express();
const PORT=process.env.PORT;


sequelizeSync();
app.use(adminRouter)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
  });