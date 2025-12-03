import { Pool } from "pg";
import config from ".";



export const pool = new Pool({
  connectionString: `${config.connectionString}`,
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      role VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
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

export default initDB;