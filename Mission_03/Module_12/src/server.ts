import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join(process.cwd(), '.env')});
const app = express();
const port = 5000;

// body parser
app.use(express.json());
app.use(express.urlencoded());

// db connection setup
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STRING}`,
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      age INT,
      phone VARCHAR(15),
      address TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      isCompleted BOOLEAN DEFAULT FALSE,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `);
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

initDB();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Next Level Developers!');
});

app.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.status(201).json({
    success: true,
    message: 'POST request received',
  });
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
