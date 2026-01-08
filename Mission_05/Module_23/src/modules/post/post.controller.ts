import { Request, Response } from 'express';
import { postService } from './post.service';
import { boolean } from 'better-auth/*';
import { PostStatus } from '../../../generated/prisma/enums';

const createPost = async (req: Request, res: Response) => {
  const { title, content, isFeatured, tags } = req.body;
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
      });
    }
    const newPost = await postService.createPost(
      title,
      content,
      tags,
      req.user?.id as string
    );
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

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const tags = req.query.tags ? (req.query.tags as string).split(',') : [];
    const isFeatured =
      req.query.isFeatured === 'true'
        ? true
        : req.query.isFeatured === 'false'
        ? false
        : undefined;
    const status = req.query.status as PostStatus | undefined;
    const authorId = req.query.authorId as string | undefined;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5;
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : req.query.sortOrder === 'desc' ? 'desc' : undefined;

    const posts = await postService.getAllPosts({
      search: search as string | undefined,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      sortBy,
      sortOrder,
    });
    res.status(200).json({
      success: true,
      message: 'Posts retrieved successfully',
      data: posts,
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
  getAllPosts,
};
