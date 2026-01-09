import { Router } from "express";
import { postRouter } from "../modules/post/post.router";
import { commentsRouter } from "../modules/comments/comments.router";
import auth, { UserRole } from "../middlewares/auth";


const router = Router();
router.use('/posts', postRouter);
router.use('/comments',auth(UserRole.USER), commentsRouter);


export { router };