import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  const { name, email, age, phone, address } = req.body;
  try {
    const result = await userServices.createUser(
      name,
      email,
      age,
      phone,
      address
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
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
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
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleUser(req.params.id!);
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
};

const updateUser = async (req: Request, res: Response) => {
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, age, phone, address } = req.body;
    try {
      const result = await userServices.updateUser(
        id!,
        name,
        email,
        age,
        phone,
        address
      );
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
  };
};

const deleteUser = async (req: Request, res: Response) => {
  async (req: Request, res: Response) => {
    try {
      const result = await userServices.deleteUser(req.params.id!);
      if (result.rowCount === 0) {
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
  };
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
