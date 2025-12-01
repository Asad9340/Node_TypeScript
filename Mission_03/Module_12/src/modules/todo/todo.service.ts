import { pool } from '../../config/db';

const addNewTodo = async (
  user_id: number,
  title: string,
  description: string,
  isCompleted: boolean,
  due_date: Date
) => {
  const result = await pool.query(
    'INSERT INTO todos (user_id, title, description, isCompleted, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user_id, title, description, isCompleted, due_date]
  );
  return result;
};

const getAllTodos = async () => {
  const result = await pool.query('SELECT * FROM todos');
  return result;
};

const getSingleTodo = async (id: string) => {
  const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
  return result;
};

const updateTodo = async (
  id: string,
  title: string,
  description: string,
  isCompleted: boolean,
  due_date: Date
) => {
  const result = await pool.query(
    `UPDATE todos SET title = $1, description = $2, isCompleted = $3, due_date = $4, updated_at = NOW() WHERE id = $5 RETURNING *`,
    [title, description, isCompleted, due_date, id]
  );
  return result;
};

const deleteTodo = async (id: string) => {
  const result = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
  return result;
};

export const todoServices = {
  addNewTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
