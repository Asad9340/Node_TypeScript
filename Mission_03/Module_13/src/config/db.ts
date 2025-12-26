import { Pool } from 'pg';
import config from '.';

export const pool = new Pool({
  connectionString: config.connectionString,
});

const dbConnection = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);
  console.log('database connected successfully');
};

export default dbConnection;
