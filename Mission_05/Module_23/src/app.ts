import express from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './../lib/auth';
import cors from 'cors';
import { router } from './router/router';

const app = express();
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());

app.use(
  cors({
    origin: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
  })
);
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

app.use('/', router);

export default app;
