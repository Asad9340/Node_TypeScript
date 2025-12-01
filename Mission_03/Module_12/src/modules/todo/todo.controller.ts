import { Request, Response } from 'express';
import { todoServices } from './todo.service';

const addNewTodo = async (req: Request, res: Response) => {
  const { user_id, title, description, isCompleted, due_date } = req.body;
  try {
    const result = await todoServices.addNewTodo(
      user_id,
      title,
      description,
      isCompleted,
      due_date
    );

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getAllTodos();
    res.status(200).json({
      success: true,
      message: 'Todos retrieved successfully',
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getSingleTodo(req.params.id!);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Todo retrieved successfully',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { title, description, isCompleted, due_date } = req.body;
  try {
    const result = await todoServices.updateTodo(
      req.params.Id!,
      title,
      description,
      isCompleted,
      due_date
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.deleteTodo(req.params.id!);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const todoControllers = {
  addNewTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
