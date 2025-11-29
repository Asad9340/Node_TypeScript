import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
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

// users crud operations
app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `
      INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *
      `,
      [name, email]
    );
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    return;
  }
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    return;
  }
});

app.get('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    return;
  }
});

app.put('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query(`UPDATE users SET name = $1 , email = $2, updated_at = NOW() WHERE id = $3 RETURNING *`, [name, email, id]);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    return;
  }
});

app.delete('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    return;
  }
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
