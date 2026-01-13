import { Router } from 'express';
import { postController } from './post.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth(UserRole.USER, UserRole.ADMIN),
  postController.createPost
);
router.get('/', postController.getAllPosts);
router.get('/stats', auth(UserRole.ADMIN), postController.getStats);
router.get('/:postId', postController.getPostById);
router.get(
  '/user/myposts',
  auth(UserRole.USER, UserRole.ADMIN),
  postController.getLoginUserPost
);
router.patch(
  '/:postId',
  auth(UserRole.USER, UserRole.ADMIN),
  postController.updatePost
);
router.delete(
  '/:postId',
  auth(UserRole.ADMIN, UserRole.USER),
  postController.deletePost
);

export const postRouter = router;
