import { Router } from 'express';
import { todoControllers } from './todo.controller';

const router = Router();

router.post('/', todoControllers.addNewTodo);
router.get('/', todoControllers.getAllTodos);
router.get('/:id', todoControllers.getSingleTodo);
router.put('/:id', todoControllers.updateTodo);
router.delete('/:id', todoControllers.deleteTodo);

export const todoRoutes = router;
