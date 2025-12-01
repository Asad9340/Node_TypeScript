import express, { Request, Response } from 'express';
import config from './config';
import initDB, { pool } from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';
import { todoRoutes } from './modules/todo/todo.routers';

const app = express();
const port = config.port;
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

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
