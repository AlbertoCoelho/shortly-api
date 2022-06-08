import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg;

const db = new Pool ({
  connectionString: process.env.DATABASE_URL
});

if(process.env.MOD === 'PROD'){
  databaseConfig.ssl = {
    rejectUnauthorized: false
  }
}

export default db;