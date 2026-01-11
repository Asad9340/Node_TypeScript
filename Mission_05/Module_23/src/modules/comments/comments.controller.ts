import { Request, Response } from 'express';
import { commentService } from './comments.service';

const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const result = await commentService.getCommentById(commentId!);
    res.status(200).json({
      success: true,
      message: 'Comment fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get comment',
      error,
    });
  }
};

const getCommentByAuthorId = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const result = await commentService.getCommentByAuthorId(authorId!);
    res.status(200).json({
      success: true,
      message: 'Comments fetched successfully by Author',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get comments by author',
      error,
    });
  }
};

const createComment = async (req: Request, res: Response) => {
  try {
    req.body.authorId = req.user?.id;
    console.log('hi', req.user);
    const result = await commentService.createComment(req.body);
    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create comment',
      error,
    });
  }
};

const updateCommentById = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { commentId } = req.params;
    const { content, status } = req.body;
    const result = await commentService.updateCommentById(
      commentId!,
      user?.id as string,
      { content, status }
    );
    res.status(200).json({
      success: true,
      message: 'Comment update successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Comment update failed',
      error,
    });
  }
};

const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error('Unauthorized Access');
    }
    const { commentId } = req.params;
    const result = await commentService.deleteCommentById(commentId!, user.id);
    res.status(200).json({
      success: true,
      message: 'Comment delete successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Comment delete failed',
      error,
    });
  }
};

const moderateComment = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const { commentId } = req.params;
    if (!commentId) {
      throw new Error('Comment id is missing');
    }
    if (!status) {
      throw new Error('Please give status');
    }
    const result = await commentService.moderateComment(status, commentId);
    res.status(200).json({
      success: true,
      message: 'Comment moderated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error,
    });
  }
};

export const commentController = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  updateCommentById,
  deleteCommentById,
  moderateComment,
};
