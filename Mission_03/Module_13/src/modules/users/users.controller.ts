import { Request, Response } from 'express';
import { pool } from '../../config/db';
import { usersServices } from './users.service';

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;
  try {
    const result = await usersServices.createUser(name, email, password, age);
    if (result.rows.length === 0) {
      res.status(401).json({
        success: false,
        message: 'Error! User not created ',
      });
    }
    res.status(201).send({
      success: true,
      message: 'User created successfully',
      data: result.rows[0],
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userController = {
  createUser,
};
