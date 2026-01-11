import { Router } from 'express';
import { commentController } from './comments.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = Router();

router.post('/',auth(UserRole.USER), commentController.createComment);
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

router.patch(
  '/moderate-comments/:commentId',
  auth(UserRole.ADMIN),
  commentController.moderateComment
);

export const commentsRouter = router;
