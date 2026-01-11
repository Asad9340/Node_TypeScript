import { CommentStatus } from '../../../generated/prisma/enums';
import { prisma } from '../../../lib/prisma';

const getCommentById = async (commentId: string) => {
  const result = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          content: true,
        },
      },
    },
  });
  return result;
};

const getCommentByAuthorId = async (authorId: string) => {
  const result = await prisma.comment.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          content: true,
        },
      },
    },
  });
  return result;
};

const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
}) => {
  const postData = await prisma.post.findUnique({
    where: {
      id: payload.postId,
    },
  });
  if (!postData) {
    throw new Error('Post not found');
  }
  const result = await prisma.comment.create({
    data: payload,
  });
  return result;
};

const updateCommentById = async (
  commentId: string,
  authorId: string,
  { content, status }: { content: string; status: CommentStatus }
) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
  });

  if (!comment) {
    throw new Error('Unauthorized or comment not found');
  }

  return prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
      status,
    },
  });
};

const deleteCommentById = async (commentId: string, authorId: string) => {
  const result = await prisma.comment.delete({
    where: {
      id: commentId,
      authorId,
    },
  });
  return result;
};

const moderateComment = async (status: CommentStatus, commentId: string) => {
  const result = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      status,
    },
  });
  return result;
};

export const commentService = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  updateCommentById,
  deleteCommentById,
  moderateComment,
};
