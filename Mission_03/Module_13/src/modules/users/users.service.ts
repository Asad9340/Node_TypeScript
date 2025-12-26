import { pool } from '../../config/db';
import bcrypt from "bcryptjs";

const createUser = async (name: string, email: string, password: string, age: number) => {

  const hasPassword =await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,age) VALUES ($1,$2, $3, $4) RETURNING *
    `,
    [name, email, hasPassword, age]
  );
  delete result.rows[0].password;
  return result;
};

export const usersServices = {
  createUser
}