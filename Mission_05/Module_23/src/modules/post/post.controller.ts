import { Request, Response } from 'express';
import { postService } from './post.service';
import { boolean } from 'better-auth/*';
import { PostStatus } from '../../../generated/prisma/enums';
import paginationSortingHelper from '../../helper/paginationSrotingHelper';
import { UserRole } from '../../middlewares/auth';

const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await postService.getPostById(postId!);
    res.status(200).json({
      success: true,
      message: 'Post retrieved successfully',
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: (error as Error).message,
    });
  }
};
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
const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === UserRole.ADMIN ? true : false;
    const data = req.body;
    const newPost = await postService.updatePost(
      postId!,
      authorId!,
      isAdmin,
      data
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
const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const newPost = await postService.deletePost(postId!);
    res.status(201).json({
      success: true,
      message: 'Post deleted successfully',
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Internal Server Error',
      error,
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

    const { skip, take, orderBy } = paginationSortingHelper(req.query);
    const posts = await postService.getAllPosts({
      search: search as string | undefined,
      tags,
      isFeatured,
      status,
      authorId,
      skip,
      take,
      orderBy,
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

const getLoginUserPost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const result = await postService.getLoginUserPost(userId!);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'User retrieved failed',
      error,
    });
  }
};
const getStats = async (req: Request, res: Response) => {
  try {
    const result = await postService.getStats();
    res.status(200).json({
      success: true,
      message: 'Statistics retrieved successfully',
      data: result,
    });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : 'Stats fetched failed!';
    res.status(400).json({
      error: errorMessage,
      details: e,
    });
  }
};

export const postController = {
  getPostById,
  createPost,
  getAllPosts,
  getLoginUserPost,
  updatePost,
  deletePost,
  getStats,
};
