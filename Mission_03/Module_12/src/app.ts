import express, { Request, Response } from 'express';
import config from './config';
import initDB from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';
import { todoRoutes } from './modules/todo/todo.routers';
import { authRoutes } from './modules/auth/auth.routes';

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
initDB();

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello Next Level Developers!');
});

// users crud operations
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});


export default app;