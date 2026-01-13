import { string } from 'better-auth/*';
import { prisma } from '../../../lib/prisma';
import {
  EnumPostStatusFilter,
  PostWhereInput,
} from '../../../generated/prisma/models';
import { CommentStatus, PostStatus } from '../../../generated/prisma/enums';
import { Post } from '../../../generated/prisma/client';

const getPostById = async (postId: string) => {
  const result = await prisma.$transaction(async tx => {
    await tx.post.update({
      where: { id: postId },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    const postData = await tx.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
      include: {
        comments: {
          where: {
            parentId: null,
            status: CommentStatus.APPROVED,
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            replies: {
              where: {
                status: CommentStatus.APPROVED,
              },
              orderBy: {
                createdAt: 'asc',
              },
              include: {
                replies: {
                  where: {
                    status: CommentStatus.APPROVED,
                  },
                  orderBy: {
                    createdAt: 'asc',
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return postData;
  });
  return result;
};

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

const updatePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
  data: Partial<Post>
) => {
  const postData = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
    select: { id: true, authorId: true },
  });
  if (!isAdmin && postData.authorId !== authorId) {
    throw new Error('Your are not the owner / creator of this post');
  }
  if (!isAdmin) {
    delete data.isFeatured;
  }
  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data,
  });
  return result;
};

const getAllPosts = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  skip,
  take,
  orderBy,
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  skip: number;
  take: number;
  orderBy: any;
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
    include: {
      _count: {
        select: { comments: true },
      },
    },
    skip,
    take,
    orderBy,
  });
  const total = await prisma.post.count({
    where: {
      AND: andConditions,
    },
  });
  return {
    total,
    page: Math.ceil(skip / take) + 1,
    limit: take,
    totalPage: Math.ceil(total / take),
    data: posts,
  };
};

const getLoginUserPost = async (userId: string) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
      status: 'ACTIVE',
    },
  });
  const result = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  return result;
};

const deletePost = async (postId: string) => {
  console.log(postId);
  const result = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return result;
};

const getStats = async () => {
  return await prisma.$transaction(async tx => {
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      totalComments,
      approvedComment,
      totalUsers,
      adminCount,
      userCount,
      totalViews,
    ] = await Promise.all([
      await tx.post.count(),
      await tx.post.count({ where: { status: PostStatus.PUBLISHED } }),
      await tx.post.count({ where: { status: PostStatus.DRAFT } }),
      await tx.post.count({ where: { status: PostStatus.ARCHIVED } }),
      await tx.comment.count(),
      await tx.comment.count({ where: { status: CommentStatus.APPROVED } }),
      await tx.user.count(),
      await tx.user.count({ where: { role: 'ADMIN' } }),
      await tx.user.count({ where: { role: 'USER' } }),
      await tx.post.aggregate({
        _sum: { views: true },
      }),
    ]);

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      totalComments,
      approvedComment,
      totalUsers,
      adminCount,
      userCount,
      totalViews: totalViews._sum.views,
    };
  });
};

export const postService = {
  getPostById,
  createPost,
  updatePost,
  getAllPosts,
  getLoginUserPost,
  deletePost,
  getStats,
};
