import 'dotenv/config';
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST
});

export default connection;