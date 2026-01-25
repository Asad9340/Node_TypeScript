import { Router } from 'express';
import { postRouter } from '../modules/post/post.router';
import { commentsRouter } from '../modules/comments/comments.router';

const router = Router();
router.use('/posts', postRouter);
router.use('/comments', commentsRouter);

export { router };
