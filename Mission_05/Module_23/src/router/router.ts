import { Router } from "express";
import { postRouter } from "../modules/post/post.router";


const router = Router();
router.use('/api/v1/posts', postRouter);


export { router };