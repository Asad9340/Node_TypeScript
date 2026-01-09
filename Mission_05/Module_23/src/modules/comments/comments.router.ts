import { Router } from 'express';
import { commentController } from './comments.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = Router();

router.post('/', commentController.createComment);
router.get('/:commentId', commentController.getCommentById);
router.get('/author/:authorId', commentController.getCommentByAuthorId);
router.delete(
  '/:commentId',
  auth(UserRole.ADMIN, UserRole.USER),
  commentController.deleteCommentById
);
router.patch(
  '/:commentId',
  auth(UserRole.ADMIN, UserRole.USER),
  commentController.updateCommentById
);

export const commentsRouter = router;
