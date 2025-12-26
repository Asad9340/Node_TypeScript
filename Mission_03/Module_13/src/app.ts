import express, { Request, Response } from 'express';
import { usersRoute } from './modules/users/users.routes';
import dbConnection from './config/db';

const app = express();
app.use(express.json());

dbConnection();

app.use('/api/v1/users', usersRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Test server is running',
  });
});

export default app;
