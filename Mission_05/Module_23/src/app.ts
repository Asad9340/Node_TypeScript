import express from 'express';
import { postRouter } from './modules/post/post.router';

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

app.use('/api/v1/posts', postRouter);

export default app;
