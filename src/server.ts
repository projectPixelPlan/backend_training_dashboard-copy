import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import sequelizeSync from './services/sequelize';
import postUser from './controllers/user/postUser';


dotenv.config({ path: '.env' });
const app =express();
const PORT=process.env.PORT;

app.use(express.json());

app.use(express.urlencoded({extended:true}))
sequelizeSync();

app.post("/test",postUser)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
  });