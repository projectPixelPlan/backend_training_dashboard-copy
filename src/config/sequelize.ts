import { Sequelize  } from "sequelize";
import dotenv from 'dotenv';

dotenv.config({ path: 'src/.env' });


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432, 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});
  
 export default sequelize;
