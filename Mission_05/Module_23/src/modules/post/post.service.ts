import { string } from 'better-auth/*';
import { prisma } from '../../../lib/prisma';
import {
  EnumPostStatusFilter,
  PostWhereInput,
} from '../../../generated/prisma/models';
import { PostStatus } from '../../../generated/prisma/enums';

const createPost = async (
  title: string,
  content: string,
  tags: string[],
  authorId: string,
  isFeatured?: boolean
) => {
  const result = await prisma.post.create({
    data: {
      title,
      content,
      tags,
      authorId,
      isFeatured: isFeatured ?? false,
    },
  });
  return result;
};

const getAllPosts = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number;
  limit: number;
  sortBy: string | undefined;
  sortOrder: 'asc' | 'desc' | undefined;
}) => {
  const andConditions: PostWhereInput[] = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search as string,
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: search as string,
            mode: 'insensitive',
          },
        },
        {
          tags: {
            has: search as string,
          },
        },
      ],
    });
  }
  if (tags && tags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }
  if (typeof isFeatured === 'boolean') {
    andConditions.push({
      isFeatured: isFeatured,
    });
  }
  if (status) {
    andConditions.push({
      status: status,
    });
  }
  if (authorId) {
    andConditions.push({
      authorId: authorId,
    });
  }
  const posts = await prisma.post.findMany({
    where: {
      AND: andConditions,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sortBy || 'createdAt']: sortOrder || 'desc',
    },
  });
  return posts;
};

export const postService = {
  createPost,
  getAllPosts,
};
