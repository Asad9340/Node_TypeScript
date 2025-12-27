import { Request, Response } from 'express';
import { postService } from './post.service';

const createPost = async (req: Request, res: Response) => {
  const { title, content, isFeatured, tags, authorId } = req.body;
  try {
    const newPost = await postService.createPost(
      title,
      content,
      tags,
      authorId
    );
    console.log('New Post Created:', newPost);
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: (error as Error).message,
    });
  }
};

export const postController = {
  createPost,
};
